import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { UserServiceModule } from './user_service/user_service.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ServiceModule, UserServiceModule],
  controllers: [],
})
export class AppModule {}
