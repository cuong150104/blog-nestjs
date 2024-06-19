import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        console.log('vao RolesGuard');

        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass()
        ])

        if (!requiredRoles) {
            return true;
        }
        console.log("requireRoles =>", requiredRoles);
        const {user} = context.switchToHttp().getRequest()
        console.log("user => ", user);

        return requiredRoles.some(role => user.roles.split(',').includes(role))
    }
}
