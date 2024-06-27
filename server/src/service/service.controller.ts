import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}
  @Get()
  getServices() {
    return this.serviceService.getServicesAsync();
  }
  @Get(':id')
  getService(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.getServiceAsync(id);
  }
}
