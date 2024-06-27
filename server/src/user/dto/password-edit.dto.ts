import { IsNotEmpty, IsString } from "class-validator";

export class PasswordEditDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;
  @IsString()
  @IsNotEmpty()
  newPasswordConfirm: string;
}
