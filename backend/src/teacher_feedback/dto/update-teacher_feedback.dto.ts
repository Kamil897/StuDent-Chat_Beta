import { PartialType } from '@nestjs/swagger';
import { CreateTeacherFeedbackDto } from './create-teacher_feedback.dto';

export class UpdateTeacherFeedbackDto extends PartialType(CreateTeacherFeedbackDto) {}
