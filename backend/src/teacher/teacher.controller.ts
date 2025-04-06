import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AccessTokenGuard, AdminRefreshTokenGuard, SuperAdminGuard } from 'src/common/guards';
import { TeacherSelfGuard } from 'src/common/guards/teacher-self.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }
  @UseGuards(SuperAdminGuard)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }
  @UseGuards(AccessTokenGuard)
  @Get("all")
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
  @Get(':teacherId/rating')
  getTeacherRating(@Param('teacherId') teacherId: string) {
    return this.teacherService.getTeacherRating(+teacherId);
  }
  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.teacherService.activate(link);
  }

}

