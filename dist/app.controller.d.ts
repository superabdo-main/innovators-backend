import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): Promise<{
        message: string;
    }>;
    getFixerVersion(): Promise<{
        fixer_app_version: string;
        fixer_app_release: string;
    }>;
}
