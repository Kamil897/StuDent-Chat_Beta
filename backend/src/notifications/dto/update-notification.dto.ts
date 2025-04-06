import { PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDto {
    @IsOptional()
    @IsInt()
    parent_id?: number | null;
  
    @IsOptional()
    @IsString()
    message?: string | null;
  
    @IsOptional()
    @IsInt()
    sent_at?: number | null;
  }
  