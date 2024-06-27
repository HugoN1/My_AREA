import { Controller, Get } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}
  @Get()
  getServices() {
    return this.serviceService.getServicesAsync();
  }
}
