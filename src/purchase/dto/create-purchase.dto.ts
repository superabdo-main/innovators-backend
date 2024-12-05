export class CreatePurchaseDto {
    userId?: string;
    fullname?: string;
    address?: string;
    phone?: string;
    date?: string;
    items?: CartItem[];
    issue?: IssueItem[];
    total?: number;
    closed?: boolean;
}


export class CartItem {
    uuid?: string;
    name?: string;
    price?: number;
    amount?: number;
    createdAt?: Date; // Optional, if you want to track creation date
    updatedAt?: Date; // Optional, if you want to track update date
}

export class IssueItem {
    uuid?: string;
    mainTypeLabel?: string;
    subTypeLabel?: string;
    description?: string;
    imageUrls?: string[];
    createdAt?: Date; // Optional, if you want to track creation date
    updatedAt?: Date; // Optional, if you want to track update date
}