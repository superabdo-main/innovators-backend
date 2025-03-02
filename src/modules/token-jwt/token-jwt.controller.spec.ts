import { Test, TestingModule } from '@nestjs/testing';
import { TokenJwtController } from './token-jwt.controller';
import { TokenJwtService } from './token-jwt.service';

describe('TokenJwtController', () => {
  let controller: TokenJwtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenJwtController],
      providers: [TokenJwtService],
    }).compile();

    controller = module.get<TokenJwtController>(TokenJwtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
