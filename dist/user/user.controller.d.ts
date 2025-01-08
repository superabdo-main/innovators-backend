import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): string;
    findAll(): import("@prisma/client").Prisma.Prisma__SettingsClient<{
        id: number;
        name: string | null;
        app_version: string | null;
        last_release: string | null;
        fixer_app_version: string | null;
        fixer_app_release: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
