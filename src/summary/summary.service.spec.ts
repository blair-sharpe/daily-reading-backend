import { Test, TestingModule } from '@nestjs/testing';
import { SummaryService } from './summary.service';
import { GeminiApiProvider } from '../gemini-api/gemini-api';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Daily_reading_summary } from '../entities/daily_reading_summary.entity';
import { Daily_reading } from '../entities/daily_reading.entity';
import { ReadingService } from '../reading/reading.service';

describe('TodaysSummaryService', () => {
  let service: SummaryService;
  let mockSummaryRepository: any;
  let mockReadingRepository: any;
  let mockGemini: any;
  let mockReadingService: any;

  beforeEach(async () => {
    mockSummaryRepository = {
      createQueryBuilder: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      into: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      execute: jest.fn(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
    };
    mockGemini = {
      getSummary: jest.fn(),
    };
    mockReadingService = {
      getReadingById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummaryService,
        {
          provide: getRepositoryToken(Daily_reading_summary),
          useValue: mockSummaryRepository,
        },
        {
          provide: getRepositoryToken(Daily_reading),
          useValue: mockReadingRepository,
        },
        { provide: GeminiApiProvider, useValue: mockGemini },
        { provide: ReadingService, useValue: mockReadingService },
      ],
    }).compile();

    service = module.get<SummaryService>(SummaryService);
  });

  describe('getReadingSummary', () => {
    it('should return a summary from the database if it exists', async () => {
      const expected = { summary: 'This is a test summary', id: 1 };
      const readingID = 1;
      mockSummaryRepository.getOne.mockResolvedValue({
        summary: expected.summary,
      });

      const actual = await service.getReadingSummary(readingID);
      expect(actual).toMatchObject(expected);
      expect(mockSummaryRepository.getOne).toHaveBeenCalledTimes(1);
    });

    it('should generate a new summary if it does not exist in the database and save it', async () => {
      const geminiApiMockSummary = 'This is a generated summary';
      const readingID = 1;
      mockSummaryRepository.getOne.mockResolvedValue(null);
      mockReadingService.getReadingById.mockResolvedValue('John 3:16');
      mockGemini.getSummary.mockResolvedValue({
        response: {
          text: () => geminiApiMockSummary,
        },
      });
      const addSummarySpy = jest
        .spyOn(service, 'addSummary')
        .mockResolvedValue();
      const actual = await service.getReadingSummary(readingID);
      expect(mockSummaryRepository.getOne).toHaveBeenCalledTimes(1);
      expect(mockReadingService.getReadingById).toHaveBeenCalledWith(readingID);
      expect(mockGemini.getSummary).toHaveBeenCalledWith('John 3:16');
      expect(actual).toMatchObject({
        summary: geminiApiMockSummary,
        id: readingID,
      });
      expect(addSummarySpy).toHaveBeenCalledWith(
        readingID,
        geminiApiMockSummary,
      );
      expect(addSummarySpy).toHaveBeenCalledTimes(1);
      addSummarySpy.mockRestore();
    });
  });
  describe('addSummary', () => {
    it('should add a summary to the database', async () => {
      const summary = 'This is a test summary';
      const id = 1;
      await service.addSummary(id, summary);
      expect(mockSummaryRepository.execute).toHaveBeenCalledTimes(1);
      expect(mockSummaryRepository.values).toHaveBeenCalledWith({
        id,
        summary,
      });
    });
  });
});
