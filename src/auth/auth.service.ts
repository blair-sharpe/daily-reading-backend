// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { password: _, ...result } = user;
    return result;
  }

  async findUserById(id: string): Promise<any> {
    return await this.userService.findById(Number(id));
  }

  async createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await this.userService.createUser(email, hashedPassword, name);
  }
}
