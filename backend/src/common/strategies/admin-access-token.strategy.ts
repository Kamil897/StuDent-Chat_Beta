import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { JwtFromRequestFunction, Strategy } from "passport-jwt";
import { AdminJwtPayloadWithRefreshToken, JwtAdminPayload } from "../types";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

export const AdminCookieExtractor: JwtFromRequestFunction = (req: Request) => {
    if (req && req.cookies) {
        return req.cookies["refresh_token"];
    }
    return null;
};

@Injectable()
export class AdminRefreshTokenCookieStrategy extends PassportStrategy(
    Strategy,
    "admin-access-jwt"
) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: AdminCookieExtractor,
            secretOrKey: configService.get<string>('REFRESH_TOKEN_KEY'),
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtAdminPayload): AdminJwtPayloadWithRefreshToken {
        const refreshToken = req.cookies.refresh_token;
        
        if (!refreshToken) {
            throw new ForbiddenException("Refresh token noto'g'ri");
        }
        if(payload.is_creator != true){
            throw new ForbiddenException("Sizga ruxsat yo'q");
        }
        return { ...payload, refreshToken };
    }
}
