import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public-route-decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const graphQLCtx = GqlExecutionContext.create(context);
    // If route is public return true
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      graphQLCtx.getHandler(),
      graphQLCtx.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(graphQLCtx);
  }
}
