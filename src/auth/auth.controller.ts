import { Controller, UseGuards, Request, Post, Get, Param, Inject, Session } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginGuard } from './login.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller()
export class AuthController {

  constructor(
    @Inject('UsersService') private readonly _usersService: UsersService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('user/:username')
  async user(@Param('username') username) {
    return this._usersService.findOne(username)
  }

  @UseGuards(LoginGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('views')
  getViews(@Session() session: { views?: number }) {
    session.views = (session.views || 0) + 1;
    return session.views;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
