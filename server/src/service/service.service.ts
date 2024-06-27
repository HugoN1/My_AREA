import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}
  async getServicesAsync() {
    return this.prisma.service.findMany();
  }
}
