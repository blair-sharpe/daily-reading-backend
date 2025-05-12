import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import createUserDto from 'src/users/dto/createUser.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login to the application',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  login() {
    return 'Login successful';
  }

  @ApiOperation({
    summary: 'Create a new user',
  })
  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  async create(@Body() createUserDto: createUserDto): Promise<string> {
    const { email, password, name } = createUserDto;
    await this.authService.createUser(email, password, name);
    return 'User created successfully';
  }

  @Post('logout')
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  @ApiOperation({
    summary: 'Logout from the application',
  })
  @ApiResponse({
    status: 500,
    description: 'Logout failed',
  })
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(500).send('Logout failed');
      }
      res.clearCookie('connect.sid');
      res.status(200).send('Logout successful');
    });
  }
}
