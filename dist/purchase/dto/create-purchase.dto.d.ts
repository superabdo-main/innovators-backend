export declare class CreatePurchaseDto {
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
export declare class CartItem {
    uuid?: string;
    name?: string;
    price?: number;
    amount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class IssueItem {
    uuid?: string;
    mainTypeLabel?: string;
    subTypeLabel?: string;
    description?: string;
    imageUrls?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
