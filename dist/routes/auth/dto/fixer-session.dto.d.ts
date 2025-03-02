export declare class DeviceInfoDto {
    deviceId: string;
    deviceModel: string;
    deviceOs: string;
}
export declare class FixerLoginDto {
    uuid: string;
    password: string;
    deviceInfo: DeviceInfoDto;
}
