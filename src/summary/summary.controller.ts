import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryDto } from './dto/daily-reading-summary.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdDto } from './dto/id.dto';
import { ROLES } from '../common/enums/roles.enum';
import { Roles } from '../common/decorators/Roles.decorator';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { RolesGuard } from '../common/guards/Roles.guard';

@Roles(ROLES.SUMMARY_READ, ROLES.ADMIN)
@Controller('summary')
@UseGuards(AuthenticatedGuard, RolesGuard)
export class SummaryController {
  constructor(private todaysSummaryService: SummaryService) {}
  @Get(':id')
  @ApiOperation({
    summary: 'Get a summary for a specific reading',
    description: 'Requires the `SUMMARY_READ` permission.',
  })
  @ApiResponse({
    status: 200,
    description: 'summary for the specified reading',
    type: SummaryDto,
    example:
      "Genesis 1:1-2 - 'In the beginning God created the heaven and the earth.'",
  })
  fetchSummary(@Param() idDto: IdDto): Promise<SummaryDto> {
    const { id } = idDto;
    return this.todaysSummaryService.getReadingSummary(id);
  }
}
