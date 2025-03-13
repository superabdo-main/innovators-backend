import { PrismaService } from 'nestjs-prisma';
declare const ClientJwtStrategy_base: new (...args: any) => any;
export declare class ClientJwtStrategy extends ClientJwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<{
        id: number;
        name: string | null;
        uuid: string;
        password: string | null;
        phone: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
