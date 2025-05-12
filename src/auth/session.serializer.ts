import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    private readonly rolesService: RolesService,
  ) {
    super();
  }

  serializeUser(user: any, done: (err: Error, id?: number) => void): void {
    done(null, user.unique_id);
  }

  async deserializeUser(
    unique_id: string,
    done: (err: Error, user?: any) => void,
  ) {
    const user = await this.authService.findUserById(unique_id);
    user.roles = await this.rolesService.findRolesByUserId(unique_id);
    done(null, user);
  }
}
