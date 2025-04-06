import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupPreschoolerDto } from './dto';

@Injectable()
export class GroupPreschoolerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGroupPreschoolerDto) {
    // Проверяем, существуют ли группа и дошкольник
    const groupExists = await this.prisma.group.findUnique({ where: { id: dto.group_id } });
    const preschoolerExists = await this.prisma.preschooler.findUnique({ where: { id: dto.preschooler_id } });

    if (!groupExists) {
      throw new NotFoundException(`Группа с id ${dto.group_id} не найдена`);
    }
    if (!preschoolerExists) {
      throw new NotFoundException(`Дошкольник с id ${dto.preschooler_id} не найден`);
    }

    return this.prisma.groupPreschooler.create({ data: dto });
  }

  async findAll() {
    return this.prisma.groupPreschooler.findMany({
      include: {
        group: true, 
        preschooler: true,
      },
    });
  }

  async findOne(id: number) {
    const groupPreschooler = await this.prisma.groupPreschooler.findUnique({
      where: { id },
      include: {
        group: true,
        preschooler: true,
      },
    });

    if (!groupPreschooler) {
      throw new NotFoundException(`Связь с id ${id} не найдена`);
    }

    return groupPreschooler;
  }

  async delete(id: number) {
    try {
      return await this.prisma.groupPreschooler.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Связь с id ${id} не найдена`);
    }
  }
}
