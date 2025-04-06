import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParentAndPreschoolDto, UpdateParentAndPreschoolDto } from './dto';

@Injectable()
export class ParentAndPreschoolerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParentAndPreschoolDto: CreateParentAndPreschoolDto) {
    const parent = await this.prisma.parent.findUnique({
      where: { id: createParentAndPreschoolDto.parent_id },
    });

    if (!parent) {
      throw new NotFoundException(`Parent with ID ${createParentAndPreschoolDto.parent_id} not found`);
    }

    const preschooler = await this.prisma.preschooler.findUnique({
      where: { id: createParentAndPreschoolDto.preschooler_id },
    });

    if (!preschooler) {
      throw new NotFoundException(`Preschooler with ID ${createParentAndPreschoolDto.preschooler_id} not found`);
    }

    return this.prisma.parentAndPreschool.create({
      data: {
        parent_id: createParentAndPreschoolDto.parent_id,
        preschooler_id: createParentAndPreschoolDto.preschooler_id,
        relation: createParentAndPreschoolDto.relation,
      },
    });
  }


  async findAll() {
    return this.prisma.parentAndPreschool.findMany({
      include: {
        parent: true,
        preschooler: true,
      },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.parentAndPreschool.findUnique({
      where: { id },
      include: {
        parent: true,
        preschooler: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`ParentAndPreschool with ID ${id} not found`);
    }
    return record;
  }

  async update(id: number, dto: UpdateParentAndPreschoolDto) {
    return this.prisma.parentAndPreschool.update({
      where: { id },
      data: {
        preschooler_id: dto.preschooler_id,
        parent_id: dto.parent_id,
        relation: dto.relation,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.parentAndPreschool.delete({ where: { id } });
  }
}
