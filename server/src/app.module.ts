import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ServiceModule],
  controllers: [],
})
export class AppModule {}
