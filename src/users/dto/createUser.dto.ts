import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export default class createUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'jamessmith@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'The name of the user',
    example: 'James Smith',
  })
  name: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'StrongPassword123!',
  })
  @IsStrongPassword({
    minLength: 5,
  })
  password: string;
}
