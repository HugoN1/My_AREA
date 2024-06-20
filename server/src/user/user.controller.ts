import { Controller, Get, UseGuards } from '@nestjs/common';
import { user } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor() {}
  @Get('me')
  getMe(@GetUser() user: user) {
    return user;
  }
}
