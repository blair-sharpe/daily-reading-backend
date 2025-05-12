import { Test, TestingModule } from '@nestjs/testing';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';

let controller: ReadingController;
let mockReadingService: any;

beforeEach(async () => {
  mockReadingService = {
    getReadingByDay: jest.fn(),
  };
  const module: TestingModule = await Test.createTestingModule({
    controllers: [ReadingController],
    providers: [{ provide: ReadingService, useValue: mockReadingService }],
  }).compile();

  controller = module.get<ReadingController>(ReadingController);
});

describe('getReadingByDay', () => {
  it('should return a reading for a specific day', async () => {
    const readingPayload = {
      readings: [
        { id: 1, reading: 'Genesis 1-3' },
        { id: 2, reading: 'Matthew 1' },
      ],
      dayOfYear: 1,
    };
    mockReadingService.getReadingByDay.mockResolvedValue(readingPayload);
    const results = await controller.getReadingByDay({ dayOfYear: 1 });
    expect(mockReadingService.getReadingByDay).toHaveBeenCalledWith(1);
    expect(results).toEqual(readingPayload);
  });
});
