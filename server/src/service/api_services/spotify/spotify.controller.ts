import { Controller, Get, Query, Res, UseGuards } from "@nestjs/common";
import { SpotifyService } from './spotify.service';
import { Response } from 'express';
import { JwtGuard } from '../../../auth/guard';
import { GetUser } from '../../../auth/decorator';
import { user } from '@prisma/client';

//@UseGuards(JwtGuard)
@Controller('auth/spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}
  @Get('/login')
  authorize(@Res() res: Response) {
    const url = this.spotifyService.getSpotifyAuthUrl();
    res.redirect(url);
  }
  @Get('/callback')
  async callback(@Query('code') code: string, @Query('state') state: string, @GetUser() user: user){
    return await this.spotifyService.requestAccessToken(code, state, user);
  }
}
