import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createEventDto: CreateEventDto) {
        if (createEventDto.date) {
            createEventDto.date = new Date(createEventDto.date);
        }
        return await this.prisma.event.create({
            data: createEventDto,
            include: { admin: true }, 
        });
    }

    async findAll() {
        return await this.prisma.event.findMany({
            include: { admin: true }, 
        });
    }

    async findOne(id: number) {
        return await this.prisma.event.findUnique({
            where: { id },
            include: { admin: true }, 
        });
    }

    async update(id: number, updateEventDto: UpdateEventDto) {
        if (updateEventDto.date) {
            updateEventDto.date = new Date(updateEventDto.date);
        }
        return await this.prisma.event.update({
            where: { id },
            data: updateEventDto,
            include: { admin: true }, 
        });
    }

    async remove(id: number) {
        return await this.prisma.event.delete({
            where: { id },
            include: { admin: true }, 
        });
    }
}
