export declare class CreateAuthDto {
    name: string;
    uuid?: string;
    email: string;
    phone: string;
    password: string;
}
export declare class CreateFixerAuthDto {
    uuid: string;
    password: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    country?: string;
    city?: string;
    photo?: string;
    nationalityId?: number;
    nationalityFrontImage?: string;
    nationalityBackImage?: string;
}
