import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserServiceDto } from './dto';

@Injectable()
export class UserServiceService {
  constructor(private prisma: PrismaService) {}
  async createNewUserService(user_id: number, userService: UserServiceDto) {
    return this.prisma.user_service.create({
      data: {
        user_id: user_id,
        service_id: userService.service_id,
        config: userService.config,
      },
    });
  }
}
