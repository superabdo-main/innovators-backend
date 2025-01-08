import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): string;
    findAll(): import("@prisma/client").Prisma.Prisma__SettingsClient<{
        id: number;
        name: string | null;
        app_version: string | null;
        last_release: string | null;
        fixer_app_version: string | null;
        fixer_app_release: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
