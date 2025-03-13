import { Module, MiddlewareConsumer, OnModuleInit } from '@nestjs/common';
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
import { CouponsModule } from './routes/coupons/coupons.module';
import { OffersModule } from './routes/offers/offers.module';
import { NotificationModule } from './modules/notifications/notification.module';
import * as admin from 'firebase-admin';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase.module';

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
    CouponsModule,
    OffersModule,
    NotificationModule,
    FirebaseModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggingGateway],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    // Initialize Firebase Admin SDK if not already initialized
    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          // Optional: Set the database URL, storage bucket, etc.
          // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
          // storageBucket: '<STORAGE_BUCKET>.appspot.com'
        });
        this.logger.log('Firebase Admin SDK initialized successfully');
      } catch (error) {
        this.logger.error(`Failed to initialize Firebase Admin SDK: ${error.message}`, error.stack);
        // Don't rethrow - we'll continue without Firebase functionality if initialization fails
      }
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*'); // Apply to all routes or specify as needed
  }
}
