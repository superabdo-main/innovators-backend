import { VersionService } from './version.service';
export declare class VersionController {
    private readonly versionService;
    constructor(versionService: VersionService);
    findOne(): Promise<{
        data: {
            version: string;
            releaseNotes: string;
            url: string;
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
}
