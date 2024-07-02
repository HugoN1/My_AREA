import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}
  async getServicesAsync() {
    return this.prisma.service.findMany();
  }
  async getServiceAsync(id: number) {
    const service = await this.prisma.service.findUnique({
      where: {
        service_id: id,
      },
    });
    if (!service) {
      throw new NotFoundException(`Service ${id} not found`);
    }
    return service;
  }
  async getServiceByNameAsync(name: string) {
    const service = await this.prisma.service.findUnique({
      where: {
        name: name,
      },
    });
    if (!service) {
      throw new NotFoundException(`Service ${name} not found`);
    }
    return service;
  }
}
