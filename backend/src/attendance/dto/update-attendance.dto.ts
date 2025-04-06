import { PartialType } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdateAttendanceDto {
    @IsOptional()
    @IsDateString()
    date?: string;
  
    @IsOptional()
    @IsInt()
    check_in_time?: number;
  
    @IsOptional()
    @IsInt()
    check_out_time?: number;
  
    @IsOptional()
    @IsInt()
    preschooler_id?: number;
  }
  