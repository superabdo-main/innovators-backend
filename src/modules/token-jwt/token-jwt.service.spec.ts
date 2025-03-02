import { Test, TestingModule } from '@nestjs/testing';
import { TokenJwtService } from './token-jwt.service';

describe('TokenJwtService', () => {
  let service: TokenJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenJwtService],
    }).compile();

    service = module.get<TokenJwtService>(TokenJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
