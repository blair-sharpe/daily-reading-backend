import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersRole } from '../entities/user_roles';
import { ROLES } from '../common/enums/roles.enum';

describe('RolesService', () => {
  let service: RolesService;
  let mockUsersRoleRepository: any;

  beforeEach(async () => {
    mockUsersRoleRepository = {
      createQueryBuilder: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      create: jest.fn().mockReturnThis(),
      save: jest.fn(),
      findOne: jest.fn(),
      insert: jest.fn().mockReturnThis(),
      into: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      execute: jest.fn(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
      getMany: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(UsersRole),
          useValue: mockUsersRoleRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  describe('findRolesByUserId', () => {
    it('should return roles for a given userID', async () => {
      const roles = [{ role: ROLES.ADMIN }, { role: ROLES.SUMMARY_READ }];
      mockUsersRoleRepository.getMany.mockResolvedValue(roles);
      const rolesResponse = await service.findRolesByUserId('1');
      expect(rolesResponse).toEqual([ROLES.ADMIN, ROLES.SUMMARY_READ]);
    });
  });

  describe('addRolesToUser', () => {
    it('should add roles to a user', async () => {
      const roles = [ROLES.ADMIN, ROLES.SUMMARY_READ];
      mockUsersRoleRepository.findOne.mockResolvedValue(null);
      await service.addRolesToUser(1, roles);
      expect(mockUsersRoleRepository.save).toHaveBeenCalledTimes(roles.length);
      expect(mockUsersRoleRepository.create).toHaveBeenCalledTimes(
        roles.length,
      );
    });
    it('should not add duplicate roles to a user', async () => {
      const roles = [ROLES.ADMIN];
      mockUsersRoleRepository.findOne.mockResolvedValue({
        role: ROLES.ADMIN,
      });
      await service.addRolesToUser(1, roles);
      expect(mockUsersRoleRepository.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('removeRolesFromUser', () => {
    it('should remove roles from a user', async () => {
      const roles = [ROLES.ADMIN, ROLES.SUMMARY_READ];
      await service.removeRolesFromUser(1, roles);
      expect(mockUsersRoleRepository.delete).toHaveBeenCalledTimes(
        roles.length,
      );
    });
  });
});
