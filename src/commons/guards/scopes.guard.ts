import { Reflector } from '@nestjs/core';
import { SCOPES_KEY } from 'src/commons/decorators/scope.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(SCOPES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredScopes) {
      return true; // Si no se especifican scopes, permite el acceso
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    return requiredScopes.some((scope) => user.scopes?.includes(scope));
  }
}
