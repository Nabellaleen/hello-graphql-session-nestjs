import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from "./current-user.decorator";

@Resolver('User')
export class AuthResolver {

  constructor(
    @Inject('UsersService') private readonly _usersService: UsersService,
  ) {}

  @Query()
  async user(@Args('username') username: string) {
    return this._usersService.findOne(username);
  }

  @UseGuards(GqlAuthGuard('local'))
  @Mutation()
  async login(
    @CurrentUser() user,
    @Args('username') _username: string,
    @Args('password') _password: string,
  ) {
    return user
  }
}
