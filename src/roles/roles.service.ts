import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRole } from '../entities/user_roles';
import { Repository } from 'typeorm';
import { ROLES } from '../common/enums/roles.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(UsersRole)
    private usersRoleRepository: Repository<UsersRole>,
  ) {}
  async findRolesByUserId(userId: string): Promise<string[]> {
    const roles = await this.usersRoleRepository
      .createQueryBuilder('users_roles')
      .select('users_roles.role')
      .where('users_roles.user_id = :userId', { userId })
      .getMany();

    return roles.map((role) => role.role);
  }

  async addRolesToUser(userId: number, roles: ROLES[]): Promise<string> {
    for (const role of roles) {
      const existingRole = await this.usersRoleRepository.findOne({
        where: {
          user_id: userId,
          role: role,
        },
      });

      if (!existingRole) {
        const newRole = this.usersRoleRepository.create({
          user_id: userId,
          role: role,
        });
        await this.usersRoleRepository.save(newRole);
      }
    }
    return 'Roles added successfully';
  }

  async removeRolesFromUser(userId: number, roles: ROLES[]): Promise<string> {
    for (const role of roles) {
      await this.usersRoleRepository.delete({
        user_id: userId,
        role: role,
      });
    }
    return 'Roles removed successfully';
  }
}
