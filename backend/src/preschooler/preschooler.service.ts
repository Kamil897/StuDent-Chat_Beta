import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePreschoolerDto } from './dto';
import * as moment from 'moment';

@Injectable()
export class PreschoolerService {
  constructor(private readonly prisma: PrismaService) { }


  async create(dto: CreatePreschoolerDto) {
    console.log('📌 Received DTO:', dto); // Логируем входные данные

    return this.prisma.preschooler.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        registration_date: new Date(dto.registration_date + 'T00:00:00.000Z'), // ✅ Добавляем `T00:00:00.000Z`
        born_date: new Date(dto.born_date + 'T00:00:00.000Z'), // ✅ Аналогично
        gender: dto.gender.toLowerCase(),
      },
    });
  }




  async findAll() {
    return this.prisma.preschooler.findMany();
  }

  async findOne(id: number) {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('❌ Неверный ID!');
    }

    console.log('📌 findOne() received ID:', id); // ✅ Логируем входящий ID

    return this.prisma.preschooler.findUnique({
      where: { id: Number(id) }, // ✅ Преобразуем в `number`
    });
  }


  async update(id: number, dto: Partial<CreatePreschoolerDto>) {
    return this.prisma.preschooler.update({
      where: { id },
      data: {
        ...dto,
        registration_date: dto.registration_date ? new Date(dto.registration_date) : undefined,
        born_date: dto.born_date ? new Date(dto.born_date) : undefined,
        gender: dto.gender ? dto.gender.toLowerCase() : undefined,
      },
    });
  }

  async remove(id: number) {
    const preschooler = await this.prisma.preschooler.findUnique({
        where: { id },
    });
    if (!preschooler) {
        throw new NotFoundException(`Preschooler with ID ${id} does not exist`);
    }
    return this.prisma.preschooler.delete({
        where: { id },
    });
  }
}
