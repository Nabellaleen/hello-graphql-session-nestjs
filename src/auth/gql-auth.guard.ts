import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

export const GqlAuthGuard = (strategy?: string) =>
  class GqlAuthGuardInternal extends AuthGuard(strategy) {
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
