import { PartialType } from '@nestjs/swagger';
import { CreateTeacherReviewDto } from './create-teacher_review.dto';

export class UpdateTeacherReviewDto extends PartialType(CreateTeacherReviewDto) {}
