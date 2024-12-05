import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { LoggingGateway } from './logging.gateway';
import { LoggingMiddleware } from './logging-middleware';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PurchaseModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggingGateway],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggingMiddleware)
  //     .forRoutes('*'); // Apply to all routes or specify as needed
  // }
}
