import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsStrongPassword()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    confirm_password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;


    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    hashed_refreshToken?: string;

    @ApiProperty({ default: false })
    @IsBoolean()
    @IsOptional()
    is_creator: boolean = false;

    @ApiProperty({ default: true })
    @IsBoolean()
    @IsOptional()
    is_active: boolean = true;

    @ApiProperty({ default: () => new Date() })
    @IsOptional()
    createdAt: Date = new Date();

    @ApiProperty({ default: () => new Date() })
    @IsOptional()
    updatedAt: Date = new Date();
}
