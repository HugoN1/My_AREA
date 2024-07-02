import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { SpotifyModule } from './service/api_services/spotify/spotify.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ServiceModule, SpotifyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
