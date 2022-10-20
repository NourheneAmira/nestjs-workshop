import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
// decorateur recuperable via @User

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
