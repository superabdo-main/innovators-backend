import { Module } from '@nestjs/common';
import { PlaystationService } from './playstation.service';
import { PlaystationController } from './playstation.controller';

@Module({
  controllers: [PlaystationController],
  providers: [PlaystationService],
})
export class PlaystationModule {}
