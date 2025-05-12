import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { ROLES } from '../common/enums/roles.enum';
import RoleDto from './dtos/role.dto';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;
  let mockRolesService: any;
  const userId = 1;
  const roles = [ROLES.ADMIN, ROLES.SUMMARY_READ];

  beforeEach(async () => {
    mockRolesService = {
      addRolesToUser: jest.fn(),
      removeRolesFromUser: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [{ provide: RolesService, useValue: mockRolesService }],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  describe('addRolesToUser', () => {
    it('should add roles to a user', async () => {
      const roleDto: RoleDto = { roles };
      await controller.addRolesToUser(userId, roleDto);
      expect(mockRolesService.addRolesToUser).toHaveBeenCalledWith(
        userId,
        roles,
      );
    });
  });
  describe('removeRolesForUser', () => {
    it('should remove roles for a user', async () => {
      const roleDto: RoleDto = { roles };
      await controller.removeRolesForUser(userId, roleDto);
      expect(mockRolesService.removeRolesFromUser).toHaveBeenCalledWith(
        userId,
        roles,
      );
    });
  });
});
