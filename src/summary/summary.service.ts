import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Daily_reading_summary } from '../entities/daily_reading_summary.entity';
import { Repository } from 'typeorm';
import { SummaryDto } from './dto/daily-reading-summary.dto';
import { GeminiApiProvider } from '../gemini-api/gemini-api';
import { ReadingService } from '../reading/reading.service';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Daily_reading_summary)
    private dailyReadingSummaryRepository: Repository<Daily_reading_summary>,
    private geminiApi: GeminiApiProvider,
    private todaysReadingService: ReadingService,
  ) {}
  async getReadingSummary(id: number): Promise<SummaryDto> {
    const summaryResult = await this.dailyReadingSummaryRepository
      .createQueryBuilder('daily_reading_summary')
      .select(['daily_reading_summary.summary'])
      .where('daily_reading_summary.id = :id', { id })
      .getOne();

    if (summaryResult) {
      return { summary: summaryResult.summary, id };
    }

    const readingResult = await this.todaysReadingService.getReadingById(id);
    const aiSummary = await this.geminiApi.getSummary(readingResult);
    const text = aiSummary.response.text();
    await this.addSummary(id, text);

    return { summary: text, id };
  }

  async addSummary(id: number, summary: string): Promise<void> {
    await this.dailyReadingSummaryRepository
      .createQueryBuilder()
      .insert()
      .into(Daily_reading_summary)
      .values({ id, summary })
      .execute();
  }
}
