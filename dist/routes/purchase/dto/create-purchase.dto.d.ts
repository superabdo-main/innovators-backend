import { MainServicesDto } from 'src/routes/services/dto/service.dto';
export declare class CreatePurchaseDto {
    isGuest?: boolean;
    userId?: string;
    fullname?: string;
    address?: string;
    phone?: string;
    maintenanceDate?: Date;
    items?: CartItem[];
    malfunctions?: CartMalfunction[];
    subTotal?: number;
    discount?: number;
    total?: number;
}
export declare class CartItem {
    itemUUID?: string;
    service: MainServicesDto;
    serviceId: number;
    price: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class CartMalfunction {
    itemUUID?: string;
    service: MainServicesDto;
    serviceId: number;
    description: string;
    imagesUrls: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
