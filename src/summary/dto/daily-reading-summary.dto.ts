import { ApiProperty } from '@nestjs/swagger';

export class SummaryDto {
  @ApiProperty({
    description: 'reading summary',
    example: 'Genesis 1, is about the creation of the world.',
  })
  summary: string;

  @ApiProperty({ description: 'unique ID', example: 123 })
  id: number;
}
