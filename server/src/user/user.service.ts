import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordEditDto } from './dto';
import * as argon from 'argon2';
import { user } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async deleteMe(user: user) {
    await this.prisma.user.delete({
      where: {
        user_id: user.user_id,
      },
    });
  }
  async updatePasswordAsync(password: PasswordEditDto, user: user) {
    // verify if the new password and the confirmation password match
    if (password.newPassword != password.newPasswordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }
    // hash new password
    const hash = await argon.hash(password.newPassword);
    // get the user's current password
    const userPassword = await this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      select: {
        password: true,
      },
    });
    // verify if the new password is the same as the old password
    if (await argon.verify(userPassword.password, password.newPassword)) {
      throw new BadRequestException('New password cannot be the same as the old password');
    }
    // update the user's password
    await this.prisma.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        password: hash,
      },
    });
  }
  async getAreas(user: user) {
    return this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      select: {
        area: true,
      },
    });
  }
  async deleteAreas(user: user) {
    await this.prisma.area.deleteMany({
      where: {
        user_id: user.user_id,
      },
    });
  }
}
