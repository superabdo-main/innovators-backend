import { Module } from '@nestjs/common';
import { FixerService } from './fixer.service';
import { FixerController } from './fixer.controller';
import { FixerAssignmentService } from './fixer-assignment.service';
import { NotificationService } from '../notification/notification.service';

@Module({
  controllers: [FixerController],
  providers: [FixerService, FixerAssignmentService, NotificationService],
  exports: [FixerService, FixerAssignmentService],
})
export class FixerModule {}
