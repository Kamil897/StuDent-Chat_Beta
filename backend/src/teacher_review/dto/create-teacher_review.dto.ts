import { IsInt, IsString, IsDateString } from 'class-validator';

export class CreateTeacherReviewDto {
  @IsInt()
  teacher_id: number;

  @IsInt()
  parent_id: number;

  @IsString()
  message: string;

  @IsInt()
  rating: number;

  @IsDateString()
  written_at: string;
}
