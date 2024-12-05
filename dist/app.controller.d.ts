import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getVersion(): Promise<{
        app_version: string;
        last_release: string;
    }>;
}
