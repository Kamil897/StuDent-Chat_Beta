import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRegistrationDto, UpdateEventRegistrationDto } from './dto';

@Injectable()
export class EventRegistrationService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEventRegistrationDto: CreateEventRegistrationDto) {
    return this.prisma.eventRegistration.create({data:{...createEventRegistrationDto}});
  }

  async findAll() {
    return this.prisma.eventRegistration.findMany();
  }

  async findOne(id: number) {
    return this.prisma.eventRegistration.findUnique({ where: { id } });
  }

  async update(id: number, updateEventRegistrationDto: UpdateEventRegistrationDto) {
    return this.prisma.eventRegistration.update({
      where: { id },
      data: { ...updateEventRegistrationDto } as any,
    });
  }


  async remove(id: number) {
    return this.prisma.eventRegistration.delete({ where: { id } });
  }
}
