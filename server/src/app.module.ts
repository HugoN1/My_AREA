import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UserController],
})
export class AppModule {}
