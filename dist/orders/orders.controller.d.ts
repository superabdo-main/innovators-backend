import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(data: any): Promise<{
        data: {
            fixers: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                userId: string | null;
                uuid: string;
                password: string;
                name: string | null;
                phone: string | null;
                email: string | null;
                location: string | null;
                profileImage: string | null;
                idCardApproved: boolean;
                professionalLicense: boolean;
                isVerified: boolean;
                verifiedAt: Date | null;
                activeOrderId: number | null;
            }[];
        } & {
            id: number;
            leaderId: string | null;
            adminNotes: string | null;
            beginWork: boolean | null;
            clientApproveToBeginWork: boolean | null;
            status: import("@prisma/client").$Enums.OperationStatus;
            closed: boolean;
            startDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        fixers: {
            data: {
                fixerIds: any[];
                leaderId: any;
                nextAvailableTime: Date;
                message: string;
            };
            status: number;
            ok: boolean;
            error: string;
        } | {
            data: {
                fixerIds: string[];
                leaderId: string;
                message: string;
                nextAvailableTime?: undefined;
            };
            status: number;
            ok: boolean;
            error: string;
        };
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {};
        ok: boolean;
        status: number;
        error: string;
        fixers?: undefined;
    }>;
    getUpcomingOrders(fixerId: string): Promise<{
        data: {
            orders: ({
                purchase: {
                    items: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        uuid: string | null;
                        name: string | null;
                        price: number | null;
                        amount: number | null;
                        purchaseId: number | null;
                    }[];
                    issue: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        uuid: string | null;
                        purchaseId: number | null;
                        mainTypeLabel: string | null;
                        subTypeLabel: string | null;
                        description: string | null;
                        imageUrls: string[];
                    }[];
                } & {
                    id: number;
                    status: import("@prisma/client").$Enums.OperationStatus;
                    closed: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string | null;
                    phone: string | null;
                    orderOperatorId: number | null;
                    fullname: string | null;
                    address: string | null;
                    date: Date | null;
                    total: number | null;
                    AuthUserId: number | null;
                };
                fixers: {
                    id: number;
                    userId: string;
                    uuid: string;
                    name: string;
                    phone: string;
                    profileImage: string;
                    professionalLicense: boolean;
                    isVerified: boolean;
                    stats: {
                        averageRating: number;
                        completedJobs: number;
                    };
                }[];
                fixersNotes: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    activeOrderId: number | null;
                    orderId: number;
                    fixerUserId: number;
                    note: string | null;
                    imageUrl: string | null;
                }[];
            } & {
                id: number;
                leaderId: string | null;
                adminNotes: string | null;
                beginWork: boolean | null;
                clientApproveToBeginWork: boolean | null;
                status: import("@prisma/client").$Enums.OperationStatus;
                closed: boolean;
                startDate: Date | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
        };
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {};
        ok: boolean;
        status: number;
        error: string;
    }>;
    getActiveOrder(fixerId: string): Promise<{
        data: {
            activeOrder: {
                fixers: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string | null;
                    uuid: string;
                    password: string;
                    name: string | null;
                    phone: string | null;
                    email: string | null;
                    location: string | null;
                    profileImage: string | null;
                    idCardApproved: boolean;
                    professionalLicense: boolean;
                    isVerified: boolean;
                    verifiedAt: Date | null;
                    activeOrderId: number | null;
                }[];
                fixersNotes: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    activeOrderId: number | null;
                    orderId: number;
                    fixerUserId: number;
                    note: string | null;
                    imageUrl: string | null;
                }[];
                order: {
                    purchase: {
                        items: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            uuid: string | null;
                            name: string | null;
                            price: number | null;
                            amount: number | null;
                            purchaseId: number | null;
                        }[];
                        issue: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            uuid: string | null;
                            purchaseId: number | null;
                            mainTypeLabel: string | null;
                            subTypeLabel: string | null;
                            description: string | null;
                            imageUrls: string[];
                        }[];
                    } & {
                        id: number;
                        status: import("@prisma/client").$Enums.OperationStatus;
                        closed: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string | null;
                        phone: string | null;
                        orderOperatorId: number | null;
                        fullname: string | null;
                        address: string | null;
                        date: Date | null;
                        total: number | null;
                        AuthUserId: number | null;
                    };
                } & {
                    id: number;
                    leaderId: string | null;
                    adminNotes: string | null;
                    beginWork: boolean | null;
                    clientApproveToBeginWork: boolean | null;
                    status: import("@prisma/client").$Enums.OperationStatus;
                    closed: boolean;
                    startDate: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: number;
                status: import("@prisma/client").$Enums.OperationStatus;
                closed: boolean;
                createdAt: Date;
                updatedAt: Date;
                orderOperatorId: number;
                notes: string | null;
                finishedAt: Date | null;
            };
        };
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {};
        ok: boolean;
        status: number;
        error: string;
    }>;
    getCompletedOrders(fixerId: string): Promise<{
        data: {
            orders: ({
                purchase: {
                    items: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        uuid: string | null;
                        name: string | null;
                        price: number | null;
                        amount: number | null;
                        purchaseId: number | null;
                    }[];
                    issue: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        uuid: string | null;
                        purchaseId: number | null;
                        mainTypeLabel: string | null;
                        subTypeLabel: string | null;
                        description: string | null;
                        imageUrls: string[];
                    }[];
                } & {
                    id: number;
                    status: import("@prisma/client").$Enums.OperationStatus;
                    closed: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string | null;
                    phone: string | null;
                    orderOperatorId: number | null;
                    fullname: string | null;
                    address: string | null;
                    date: Date | null;
                    total: number | null;
                    AuthUserId: number | null;
                };
                fixers: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string | null;
                    uuid: string;
                    password: string;
                    name: string | null;
                    phone: string | null;
                    email: string | null;
                    location: string | null;
                    profileImage: string | null;
                    idCardApproved: boolean;
                    professionalLicense: boolean;
                    isVerified: boolean;
                    verifiedAt: Date | null;
                    activeOrderId: number | null;
                }[];
                fixersNotes: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    activeOrderId: number | null;
                    orderId: number;
                    fixerUserId: number;
                    note: string | null;
                    imageUrl: string | null;
                }[];
            } & {
                id: number;
                leaderId: string | null;
                adminNotes: string | null;
                beginWork: boolean | null;
                clientApproveToBeginWork: boolean | null;
                status: import("@prisma/client").$Enums.OperationStatus;
                closed: boolean;
                startDate: Date | null;
                createdAt: Date;
                updatedAt: Date;
            })[];
        };
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {};
        ok: boolean;
        status: number;
        error: string;
    }>;
    findOne(id: string): string;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
