import {
  Body,
  Controller, Delete,
  Get, Patch,
  UseGuards
} from "@nestjs/common";
import { user } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { PasswordEditDto } from "./dto";
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: user) {
    return user;
  }
  @Delete('me')
  deleteMe(@GetUser() user: user) {
    return this.userService.deleteMe(user);
  }
  @Get('me/areas')
  getAreas(@GetUser() user: user) {
    return this.userService.getAreas(user);
  }
  @Delete('me/areas')
  deleteAreas(@GetUser() user: user) {
    return this.userService.deleteAreas(user);
  }
  @Patch('me/password')
  updatePassword(@Body() password: PasswordEditDto, @GetUser() user: user) {
    return this.userService.updatePasswordAsync(password, user);
  }
}
