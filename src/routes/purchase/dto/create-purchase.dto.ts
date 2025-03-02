import { MainServicesDto } from 'src/routes/services/dto/service.dto';

export class CreatePurchaseDto {
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

export class CartItem {
  itemUUID?: string;
  service: MainServicesDto;
  serviceId: number;
  price: number;
  quantity: number;
  createdAt?: Date; // Optional, if you want to track creation date
  updatedAt?: Date; // Optional, if you want to track update date
}

export class CartMalfunction {
  itemUUID?: string;
  service: MainServicesDto;
  serviceId: number;
  description: string;
  imagesUrls: string[];
  createdAt?: Date; // Optional, if you want to track creation date
  updatedAt?: Date; // Optional, if you want to track update date
}
