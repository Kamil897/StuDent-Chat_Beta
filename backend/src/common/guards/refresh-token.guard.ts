import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RefreshTokenGuard extends AuthGuard("jwt-refresh") {
    handleRequest(err, user, info, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const refreshToken = request.cookies?.refresh_token;

        console.log("🔹 Cookies:", request.cookies);
        console.log("🔹 Authorization Header:", request.headers.authorization);
        console.log("🔹 Extracted Refresh Token:", refreshToken);

        if (err || !user || !refreshToken) {
            throw new UnauthorizedException("Invalid or missing refresh token ❌");
        }
        return user;
    }
}
