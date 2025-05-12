import { Test, TestingModule } from '@nestjs/testing';
import { Daily_reading } from '../entities/daily_reading.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReadingService } from './reading.service';

describe('TodaysReadingService', () => {
  let service: ReadingService;
  let mockReadingRepository: any;

  beforeEach(async () => {
    mockReadingRepository = {
      createQueryBuilder: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
      getMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadingService,
        {
          provide: getRepositoryToken(Daily_reading),
          useValue: mockReadingRepository,
        },
      ],
    }).compile();

    service = module.get<ReadingService>(ReadingService);
  });

  describe('getReadingById', () => {
    it('should return a reading by id', async () => {
      const readingPayload = { reading: 'John 3:16' };
      mockReadingRepository.getOne.mockResolvedValue(readingPayload);

      const reading = await service.getReadingById(1);

      expect(mockReadingRepository.getOne).toHaveBeenCalledTimes(1);
      expect(reading).toEqual(readingPayload.reading);
    });
  });
  describe('getByReadingDay', () => {
    it('should return a reading by day of year', async () => {
      const dayOfYear = 1;
      const exampleReadingItem = [
        {
          id: 1,
          reading: 'Genesis 1-3',
        },
        {
          id: 2,
          reading: 'Matthew 1',
        },
      ];

      mockReadingRepository.getMany.mockResolvedValue(exampleReadingItem);

      const readings = await service.getReadingByDay(dayOfYear);

      expect(mockReadingRepository.getMany).toHaveBeenCalledTimes(1);
      expect(readings).toEqual({
        readings: exampleReadingItem,
        dayOfYear: dayOfYear,
      });
    });
  });
});
