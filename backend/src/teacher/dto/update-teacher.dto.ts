import { PartialType } from '@nestjs/swagger';
import { CreateTeacherDto } from './create-teacher.dto';
import { IsBoolean, IsDate, IsEmail, IsInt, IsOptional, IsString } from 'class-validator';



export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsDate()
  birthday?: Date;

  @IsOptional()
  @IsString()
  old_work?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsDate()
  hire_date?: Date;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  confirm_password?: string;

  @IsOptional()
  @IsString()
  hashed_refresh_token?: string;

  @IsOptional()
  @IsInt()
  avg_rating?: number;

  @IsOptional()
  @IsBoolean()
  is_main?: boolean;
}
