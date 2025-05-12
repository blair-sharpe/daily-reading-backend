import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export default class NoteDto {
  @ApiProperty({
    description: 'The note to be saved',
    example: 'This is a note',
  })
  @MaxLength(2000)
  note: string;
}
