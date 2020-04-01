import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

export const LoginGuard = (strategy?: string) =>
  class LoginGuardInternal extends AuthGuard(strategy) {
    async canActivate(context: ExecutionContext) {
      const result = (await super.canActivate(context)) as boolean;
      const request = this.getRequest(context)
      await super.logIn(request);
      return result;
    }
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context)
      const req = ctx.getContext().req
      if (strategy == "local") {
        // Hack due to local strategy requesting to have a its fields in the "body"
        req.body = {
          ...ctx.getContext().req.body,
          ...ctx.getContext().req.body.variables,
        }
      }
      return req
    }
  }
