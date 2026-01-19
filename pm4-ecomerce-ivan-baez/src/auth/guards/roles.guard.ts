import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 1. Accedemos a la metadata de roles en la ruta
    const routeRoles = this.reflector.getAllAndOverride<Role[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    ) || [];

    // 2. Accedemos al request y al usuario
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new ForbiddenException('Usuario no autenticado o sin roles');
    }

    const userRoles: Role[] = Array.isArray(user.roles) ? user.roles : [];

    // 3. Validación de rol
    const hasRoles = routeRoles.some((role) => userRoles.includes(role));

    if (!hasRoles) {
      throw new ForbiddenException('No tiene permiso para acceder a esta ruta');
    }

    return true;
  }
} 
