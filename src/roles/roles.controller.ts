import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { RolesGuard } from 'src/common/guards/Roles.guard';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { ROLES } from 'src/common/enums/roles.enum';
import roleDto from './dtos/role.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('roles')
@Roles(ROLES.ADMIN)
@UseGuards(RolesGuard, AuthenticatedGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Post(':userId')
  @ApiOperation({
    summary: 'add a role to a user',
    description: 'Requires the `ADMIN` permission.',
  })
  async addRolesToUser(
    @Param('userId') userId: number,
    @Body() roleDto: roleDto,
  ): Promise<string> {
    const { roles } = roleDto;
    return await this.rolesService.addRolesToUser(userId, roles);
  }

  @Delete(':userId')
  @ApiOperation({
    summary: 'remove roles for a user',
    description: 'Requires the `ADMIN` permission.',
  })
  async removeRolesForUser(
    @Param('userId') userId: number,
    @Body() roleDto: roleDto,
  ): Promise<string> {
    return await this.rolesService.removeRolesFromUser(userId, roleDto.roles);
  }
}
