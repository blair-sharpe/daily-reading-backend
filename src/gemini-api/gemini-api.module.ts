import { Module } from '@nestjs/common';
import { GeminiApiProvider } from './gemini-api';

@Module({
  providers: [GeminiApiProvider],
  exports: [GeminiApiProvider],
})
export class GeminiApiModule {}
