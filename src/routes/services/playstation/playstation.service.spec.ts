import { Test, TestingModule } from '@nestjs/testing';
import { PlaystationService } from './playstation.service';

describe('PlaystationService', () => {
  let service: PlaystationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaystationService],
    }).compile();

    service = module.get<PlaystationService>(PlaystationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
