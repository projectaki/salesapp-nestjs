import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).switchToHttp().getRequest();
    return request.user;
  },
);
