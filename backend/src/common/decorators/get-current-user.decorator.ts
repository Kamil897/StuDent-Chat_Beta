import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { JwtPayloadWithRefreshToken } from "../types";

export const GetCurrentUser = createParamDecorator(
    (data: keyof JwtPayloadWithRefreshToken, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayloadWithRefreshToken;

        console.log("🔹 Extracted User:", user);
        console.log("🔹 Cookies:", request.cookies);

        if (!user) {
            throw new ForbiddenException("❌ Токен недействителен или отсутствует");
        }

        // Если запрашивается refreshToken, берём его из cookie
        if (data === "refreshToken") {
            return request.cookies?.refresh_token;
        }

        return data ? user[data] : user;
    }
);
