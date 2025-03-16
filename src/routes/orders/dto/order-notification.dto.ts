import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum NotificationTimeThreshold {
  ONE_HOUR = '1-hour',
  TEN_MINUTES = '10-minutes',
}

export class OrderNotificationDto {
  @IsEnum(NotificationTimeThreshold)
  @IsNotEmpty()
  timeThreshold: NotificationTimeThreshold;
}

export class OrderNotificationResponseDto {
  orderId: number;
  clientId: number;
  timeWindow: string;
  notificationId?: number;
  sent: boolean;
  error?: string;
}

export class NotificationResponseDto {
  data: OrderNotificationResponseDto[] | OrderNotificationResponseDto | null;
  ok: boolean;
  status: number;
  error: string;
} 