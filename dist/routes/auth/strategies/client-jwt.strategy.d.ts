import { PrismaService } from 'nestjs-prisma';
declare const ClientJwtStrategy_base: new (...args: any) => any;
export declare class ClientJwtStrategy extends ClientJwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string | null;
        uuid: string;
        password: string | null;
        phone: string | null;
        email: string;
    }>;
}
export {};
