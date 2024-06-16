import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the user to the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          username: dto.username,
        },
      });
      return this.signToken(user.user_id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw error;
    }
  }
  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    // verify the password
    const passwordValid = await argon.verify(user.password, dto.password);
    if (!passwordValid) {
      throw new ForbiddenException('Invalid password');
    }
    return this.signToken(user.user_id, user.email);
  }
  signToken(user_id: number, email: string): Promise<string> {
    const payload = {
      sub: user_id,
      email,
    };

    const secret = process.env.JWT_SECRET;
    return this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });
  }
}
