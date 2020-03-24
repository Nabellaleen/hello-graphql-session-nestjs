import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { GqlLoginGuard } from './gql-login.guard';
import { GqlCurrentUser } from "./gql-current-user.decorator";
import { GqlSession } from "./gql-session.decorator";
import { GqlAuthenticatedGuard } from "./gql-authenticated.guard";

@Resolver('User')
export class AuthResolver {

  constructor(
    @Inject('UsersService') private readonly _usersService: UsersService,
  ) {}

  @UseGuards(GqlAuthenticatedGuard)
  @Query()
  async user(@Args('username') username: string) {
    return this._usersService.findOne(username);
  }

  @UseGuards(GqlLoginGuard('local'))
  @Mutation()
  async login(
    @GqlCurrentUser() user,
    @Args('username') _username: string,
    @Args('password') _password: string,
  ) {
    return user
  }

  @UseGuards(GqlAuthenticatedGuard)
  @Query()
  async views(@GqlSession() session) {
    session.views = (session.views || 0) + 1;
    return session.views;
  }

  @UseGuards(GqlAuthenticatedGuard)
  @Query()
  async me(@GqlCurrentUser() user) {
    return user;
  }
}
