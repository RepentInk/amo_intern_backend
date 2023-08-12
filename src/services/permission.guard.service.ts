// permission.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { RoleService } from './role.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly roleService: RoleService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get the permission required to access this route
    const requiredPermission = this.reflector.get<any>(
      'permission',
      context.getHandler(),
    );
    if (!requiredPermission) {
      return true; // No permission required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // decode token
      const decodedToken = this.jwtService.verify(token);
      //   get user with permissions
      const user = await this.userService.findByEmail(decodedToken.email);
      const userRoleId: number = user.role.id;
      const userRole = await this.roleService.findOne(userRoleId);
      const userPermissions = userRole.permissions;

      if (!userPermissions.includes(requiredPermission)) {
        throw new UnauthorizedException('Insufficient permissions');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

//permisson custom decorator
import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
