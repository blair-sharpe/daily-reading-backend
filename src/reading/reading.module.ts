import { Module } from '@nestjs/common';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily_reading } from '../entities/daily_reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Daily_reading])],
  controllers: [ReadingController],
  providers: [ReadingService],
  exports: [ReadingService],
})
export class ReadingModule {}
