import { Test, TestingModule } from '@nestjs/testing';
import { GeminiApi } from './gemini-api';

describe('GeminiApi', () => {
  let provider: GeminiApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeminiApi],
    }).compile();

    provider = module.get<GeminiApi>(GeminiApi);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
