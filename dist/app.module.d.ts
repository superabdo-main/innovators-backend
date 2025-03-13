import { MiddlewareConsumer, OnModuleInit } from '@nestjs/common';
export declare class AppModule implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
    configure(consumer: MiddlewareConsumer): void;
}
