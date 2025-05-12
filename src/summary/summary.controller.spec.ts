import { Test, TestingModule } from '@nestjs/testing';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { SummaryDto } from './dto/daily-reading-summary.dto';

describe('TodaysSummaryController', () => {
  let controller: SummaryController;
  let mockSummaryService: any;

  beforeEach(async () => {
    const mockSummaryService = {
      getReadingSummary: jest.fn((id: number) => {
        return Promise.resolve({
          summary: `Summary for reading ${id}`,
          id,
        });
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummaryController],
      providers: [
        {
          provide: SummaryService,
          useValue: mockSummaryService,
        },
      ],
    }).compile();

    controller = module.get<SummaryController>(SummaryController);
  });

  it('should return a summary for a valid id', async () => {
    const expected: SummaryDto = {
      summary: 'Summary for reading 1',
      id: 1,
    };
    expect(await controller.fetchSummary({ id: 1 })).toEqual(expected);
    expect(mockSummaryService.getReadingSummary).toHaveBeenCalledWith(1);
  });
});
