import { IsString, IsNumber } from 'class-validator';

export class CreateTeacherFeedbackDto {
  @IsNumber()
  teacher_id: number;

  @IsNumber()
  preschooler_id: number;

  @IsNumber()
  parent_id: number;

  @IsString()
  title: string;

  @IsString()
  feedback: string;
}
