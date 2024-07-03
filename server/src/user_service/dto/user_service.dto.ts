import { IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export class UserServiceDto {
  @IsNotEmpty()
  @IsNumber()
  service_id: number;
  @IsOptional()
  @IsObject()
  config?: object;
}
