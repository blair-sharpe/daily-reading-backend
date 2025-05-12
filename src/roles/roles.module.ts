import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRole } from 'src/entities/user_roles';
import { RolesController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRole])],
  providers: [RolesService],
  exports: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
