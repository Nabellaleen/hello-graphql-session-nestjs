import { Controller, UseGuards, Request, Post, Get, Param, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {

  constructor(
    @Inject('UsersService') private readonly _usersService: UsersService,
  ) {}

  @Get('user/:username')
  async user(@Param('username') username) {
    return this._usersService.findOne(username)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
