import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendanceDto, UpdateAttendanceDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAttendanceDto: CreateAttendanceDto) {
    try {
      console.log('📌 DTO:', createAttendanceDto);

      const preschooler = await this.prisma.preschooler.findUnique({
        where: { id: createAttendanceDto.preschooler_id },
      });

      if (!preschooler) {
        throw new Error(`Preschooler with ID ${createAttendanceDto.preschooler_id} not found`);
      }

      const date = new Date(createAttendanceDto.date);
      if (isNaN(date.getTime())) {
        throw new BadRequestException('Invalid date format');
      }

      return await this.prisma.attendance.create({
        data: {
          date: date,
          check_in_time: new Date(`${createAttendanceDto.date}T${createAttendanceDto.check_in_time}.000Z`),
          check_out_time: createAttendanceDto.check_out_time
            ? new Date(`${createAttendanceDto.date}T${createAttendanceDto.check_out_time}.000Z`)
            : undefined,
          preschooler_id: createAttendanceDto.preschooler_id,
        },
      });
    } catch (error) {
      console.error('🔥 Ошибка при создании attendance:', error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.attendance.findMany({
      include: {
        preschooler: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.attendance.findUnique({
      where: { id },
      include: {
        preschooler: true,
      },
    });
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const data = {
      ...updateAttendanceDto,
      check_in_time:
        updateAttendanceDto.check_in_time !== undefined
          ? new Date(updateAttendanceDto.check_in_time)
          : undefined,
      check_out_time:
        updateAttendanceDto.check_out_time !== undefined
          ? new Date(updateAttendanceDto.check_out_time)
          : undefined,
    };
    return this.prisma.attendance.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.attendance.delete({ where: { id } });
  }
}
