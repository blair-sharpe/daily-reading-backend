// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    RolesModule,
  ],
  providers: [AuthService, LocalStrategy, LocalAuthGuard, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
