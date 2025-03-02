import { DeviceInfoDto } from './device-info.dto';
export declare class ClientSignupDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    device: DeviceInfoDto;
}
export declare class ClientLoginDto {
    email: string;
    password: string;
    device: DeviceInfoDto;
}
