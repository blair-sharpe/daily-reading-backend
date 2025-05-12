import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingDto } from './dto/reading.dto';
import { DayOfYearDto } from './dto/day-of-year.dto';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { ROLES } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/Roles.guard';

@ApiTags('Reading')
@Roles(ROLES.READING_READ, ROLES.ADMIN)
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('reading')
export class ReadingController {
  constructor(private todaysReadingService: ReadingService) {}

  @Get(':dayOfYear')
  @ApiOperation({
    summary: 'Get a reading for a specific day',
    description: 'Requires the `READING_READ` permission.',
  })
  @ApiResponse({
    status: 200,
    description: 'The reading for the specified day',
    type: ReadingDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid dayOfYear parameter (e.g., out of range or not an integer)',
  })
  findOne(@Param() params: DayOfYearDto): Promise<ReadingDto> {
    const { dayOfYear } = params;
    return this.todaysReadingService.getReadingByDay(dayOfYear);
  }
}
