import { Module } from '@nestjs/common';
import { FixerService } from './fixer.service';
import { FixerController } from './fixer.controller';

@Module({
  controllers: [FixerController],
  providers: [FixerService],
})
export class FixerModule {}
