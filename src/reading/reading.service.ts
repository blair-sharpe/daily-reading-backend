import { Injectable } from '@nestjs/common';
import { ReadingDto } from './dto/reading.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Daily_reading } from '../entities/daily_reading.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(Daily_reading)
    private dailyReadingRepository: Repository<Daily_reading>,
  ) {}
  async getReadingByDay(dayOfYear: number): Promise<ReadingDto> {
    const readings = await this.dailyReadingRepository
      .createQueryBuilder('daily_reading')
      .select(['daily_reading.id', 'daily_reading.reading'])
      .where('daily_reading.reading_day = :dayOfYear', { dayOfYear })
      .getMany();

    return {
      readings: readings,
      dayOfYear,
    };
  }
  async getReadingById(id: number): Promise<string> {
    const result = await this.dailyReadingRepository
      .createQueryBuilder('daily_reading')
      .select('daily_reading.reading')
      .where('daily_reading.id = :id', { id })
      .getOne();
    return result.reading;
  }
}
