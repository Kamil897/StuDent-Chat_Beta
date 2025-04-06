import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class SuperAdminGuard implements CanActivate {
    constructor(private readonly adminService: AdminService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        const admin = await this.adminService.findOne(user.id);
        if (!admin) {
            throw new UnauthorizedException('Администратор не найден');
        }

        if (!admin.is_creator) {
            throw new ForbiddenException('У вас нет доступа');
        }

        return true;
    }
}
