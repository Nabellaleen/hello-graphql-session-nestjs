import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const LoginGuard = (strategy?: string) =>
  class LoginGuardInternal extends AuthGuard(strategy) {
    async canActivate(context: ExecutionContext) {
      const result = (await super.canActivate(context)) as boolean;
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
      return result;
    }
  };
