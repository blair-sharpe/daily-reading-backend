import { ApiProperty } from '@nestjs/swagger';

class ReadingItem {
  @ApiProperty({ description: 'The id of the reading', example: 1 })
  id: number;
  @ApiProperty({ description: 'The reading text', example: 'Genesis 1' })
  reading: string;
}

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

export class ReadingDto {
  @ApiProperty({
    description: 'Old Testament reading',
    example: exampleReadingItem,
    type: ReadingItem,
  })
  readings: ReadingItem[];

  @ApiProperty({ description: 'The day of the year', example: 1 })
  dayOfYear: number;
}
