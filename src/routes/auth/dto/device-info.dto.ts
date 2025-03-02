import { IsNotEmpty, IsString } from 'class-validator';

export class DeviceInfoDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  deviceModel: string;

  @IsString()
  @IsNotEmpty()
  deviceOs: string;
}
