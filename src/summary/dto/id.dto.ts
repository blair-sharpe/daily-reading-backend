import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdDto {
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ description: 'unique ID', example: 123 })
  @IsNumber({}, { message: 'id must be a number' })
  id: number;
}
