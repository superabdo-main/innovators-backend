import { Test, TestingModule } from '@nestjs/testing';
import { PlaystationController } from './playstation.controller';
import { PlaystationService } from './playstation.service';

describe('PlaystationController', () => {
  let controller: PlaystationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaystationController],
      providers: [PlaystationService],
    }).compile();

    controller = module.get<PlaystationController>(PlaystationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
