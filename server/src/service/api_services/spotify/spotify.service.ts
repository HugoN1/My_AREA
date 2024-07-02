import { Injectable } from '@nestjs/common';
import * as querystring from 'querystring';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { user } from '@prisma/client';
import { UserServiceService } from '../../../user_service/user_service.service';
import { ServiceService } from '../../service.service';

@Injectable()
export class SpotifyService {
  private state = 'teststate';
  constructor(
    private httpService: HttpService,
    private userServiceService: UserServiceService,
    private serviceService: ServiceService,
  ) {}
  getSpotifyAuthUrl() {
    const scope = 'user-read-private user-read-email';
    const redirectUri = 'http://localhost:8080/auth/spotify/callback';
    const queryParams = querystring.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: redirectUri,
      state: this.state,
      scope: scope,
    });
    return `https://accounts.spotify.com/authorize?${queryParams}`;
  }
  async requestAccessToken(code: string, state: string, user: user) {
    if (!state || state !== this.state) {
      throw new Error('Invalid state');
    }
    const url = 'https://accounts.spotify.com/api/token';
    const bodyParams = querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:8080/auth/spotify/callback',
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
    };
    const response = await lastValueFrom(
      this.httpService.post(url, bodyParams, { headers }),
    );
    if (response.data.access_token) {
      /*const spotify_service = await this.serviceService.getServiceByNameAsync('spotify');
      await this.userServiceService.createNewUserService(
        user.user_id,
        spotify_service.service_id,
      );*/
      return response.data.access_token;
    } else {
      throw new Error('Failed to get access token');
    }
  }
  async getRefreshToken(refresh_token: string)
  {
    const url = 'https://accounts.spotify.com/api/token';
    const bodyParams = querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
    };
    const response = await lastValueFrom(
      this.httpService.post(url, bodyParams, { headers }),
    );
    if (response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error('Failed to get access token');
    }
  }
}
