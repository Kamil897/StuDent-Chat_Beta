import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherFeedbackDto, UpdateTeacherFeedbackDto } from './dto';

@Injectable()
export class TeacherFeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTeacherFeedbackDto) {
    // Проверяем, существуют ли teacher, preschooler и parent
    const teacherExists = await this.prisma.teacher.findUnique({ where: { id: dto.teacher_id } });
    const preschoolerExists = await this.prisma.preschooler.findUnique({ where: { id: dto.preschooler_id } });
    const parentExists = await this.prisma.parent.findUnique({ where: { id: dto.parent_id } });

    if (!teacherExists) {
      throw new NotFoundException(`Учитель с id ${dto.teacher_id} не найден`);
    }
    if (!preschoolerExists) {
      throw new NotFoundException(`Дошкольник с id ${dto.preschooler_id} не найден`);
    }
    if (!parentExists) {
      throw new NotFoundException(`Родитель с id ${dto.parent_id} не найден`);
    }

    return this.prisma.teacherFeedback.create({ data: dto });
  }

  async findAll() {
    return this.prisma.teacherFeedback.findMany({
      include: {
        teacher: true,
        preschooler: true,
        parent: true,
      },
    });
  }

  async findOne(id: number) {
    const feedback = await this.prisma.teacherFeedback.findUnique({
      where: { id },
      include: {
        teacher: true,
        preschooler: true,
        parent: true,
      },
    });

    if (!feedback) {
      throw new NotFoundException(`Отзыв с id ${id} не найден`);
    }

    return feedback;
  }

  async update(id: number, dto: Partial<UpdateTeacherFeedbackDto>) {
    try {
      return await this.prisma.teacherFeedback.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new NotFoundException(`Отзыв с id ${id} не найден`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.teacherFeedback.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Отзыв с id ${id} не найден`);
    }
  }
}
