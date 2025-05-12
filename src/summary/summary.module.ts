import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { ReadingModule } from '../reading/reading.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily_reading_summary } from '../entities/daily_reading_summary.entity';
import { GeminiApiModule } from '../gemini-api/gemini-api.module';

@Module({
  imports: [
    GeminiApiModule,
    ReadingModule,
    TypeOrmModule.forFeature([Daily_reading_summary]),
  ],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
