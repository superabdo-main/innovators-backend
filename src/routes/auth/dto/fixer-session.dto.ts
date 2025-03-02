import { IsString, IsNotEmpty } from 'class-validator';

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

export class FixerLoginDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  deviceInfo: DeviceInfoDto;
}
