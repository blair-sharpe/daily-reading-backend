import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from '../../common/enums/roles.enum';

export default class RoleDto {
  @ApiProperty({
    description: 'The role to be assigned to the user',
    example: ['READ_SUMMARY', 'NOTE_READ'],
    isArray: true,
    enum: ROLES,
  })
  @IsEnum(ROLES, {
    message: 'Each role must be a valid role',
    each: true,
  })
  roles: ROLES[];
}
