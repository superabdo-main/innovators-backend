import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { LoggingGateway } from './logging.gateway';
import { LoggingMiddleware } from './logging-middleware';
import { PurchaseModule } from './routes/purchase/purchase.module';
import { AuthModule } from './routes/auth/auth.module';
import { PlaystationModule } from './routes/services/playstation/playstation.module';
import { FixerModule } from './routes/fixer/fixer.module';
import { OrdersModule } from './routes/orders/orders.module';
import { ServicesModule } from './routes/services/services.module';
import { MaintenanceModule } from './routes/maintenance/maintenance.module';
import { ClientModule } from './routes/client/client.module';
import { VersionModule } from './routes/version/version.module';
import { TokenJwtModule } from './modules/token-jwt/token-jwt.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    PurchaseModule,
    AuthModule,
    PlaystationModule,
    FixerModule,
    OrdersModule,
    ServicesModule,
    MaintenanceModule,
    ClientModule,
    VersionModule,
    TokenJwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggingGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*'); // Apply to all routes or specify as needed
  }
}
