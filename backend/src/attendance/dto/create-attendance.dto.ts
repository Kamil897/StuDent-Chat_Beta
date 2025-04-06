import { IsString, IsNumber, Matches, IsDate } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  date: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}:\d{2}$/, { message: 'Invalid check_in_time format. Use HH:mm:ss' })
  check_in_time: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}:\d{2}$/, { message: 'Invalid check_out_time format. Use HH:mm:ss' })
  check_out_time: string;

  @IsNumber()
  preschooler_id: number;
}
