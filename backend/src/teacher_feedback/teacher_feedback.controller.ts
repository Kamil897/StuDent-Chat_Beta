import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherFeedbackService } from './teacher_feedback.service';
import { CreateTeacherFeedbackDto } from './dto/create-teacher_feedback.dto';
import { UpdateTeacherFeedbackDto } from './dto/update-teacher_feedback.dto';

@Controller('teacher-feedback')
export class TeacherFeedbackController {
  constructor(private readonly teacherFeedbackService: TeacherFeedbackService) {}

  @Post()
  create(@Body() createTeacherFeedbackDto: CreateTeacherFeedbackDto) {
    return this.teacherFeedbackService.create(createTeacherFeedbackDto);
  }

  @Get()
  findAll() {
    return this.teacherFeedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherFeedbackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherFeedbackDto: UpdateTeacherFeedbackDto) {
    return this.teacherFeedbackService.update(+id, updateTeacherFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherFeedbackService.remove(+id);
  }
}
