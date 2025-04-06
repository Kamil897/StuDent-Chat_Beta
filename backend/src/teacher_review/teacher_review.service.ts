import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherReviewDto, UpdateTeacherReviewDto } from './dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherReviewService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateTeacherReviewDto) {
    return this.prisma.teacherReview.create({
      data: {
        ...dto,
        written_at: new Date(dto.written_at),
      }
    });
  }

  async findAll() {
    return this.prisma.teacherReview.findMany();
  }

  async findOne(id: number) {
    return this.prisma.teacherReview.findUnique({ where: { id } });
  }

  async update(id: number, dto: Partial<UpdateTeacherReviewDto>) {
    return this.prisma.teacherReview.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    return this.prisma.teacherReview.delete({ where: { id } });
  }

  
}