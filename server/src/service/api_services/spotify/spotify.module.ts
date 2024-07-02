import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { UserServiceModule } from "../../../user_service/user_service.module";

@Module({
  imports: [HttpModule, PrismaModule, UserServiceModule],
  controllers: [SpotifyController],
  providers: [SpotifyService],
})
export class SpotifyModule {}
