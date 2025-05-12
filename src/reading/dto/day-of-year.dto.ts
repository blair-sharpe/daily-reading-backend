import { IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DayOfYearDto {
  @ApiProperty({
    description: 'The day of the year (1-365)',
    example: 123,
  })
  @IsInt({ message: 'dayOfYear must be an integer' })
  @Min(1, { message: 'dayOfYear must be at least 1' })
  @Max(365, { message: 'dayOfYear must be at most 365' })
  @Transform(({ value }) => {
    return Number(value);
  })
  dayOfYear: number;
}
