import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const data: any = {
      ...createNotificationDto,
      ...(createNotificationDto.parent_id !== null && { parent_id: createNotificationDto.parent_id }),
      ...(createNotificationDto.message !== null && { message: createNotificationDto.message }),
      ...(createNotificationDto.sent_at !== null && { sent_at: new Date(createNotificationDto.sent_at) }),
    };
    return this.prisma.notification.create({ data });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const data = {
      ...updateNotificationDto,
      parent_id: updateNotificationDto.parent_id !== null ? updateNotificationDto.parent_id : undefined,
      message: updateNotificationDto.message !== null ? updateNotificationDto.message : undefined,
      sent_at: updateNotificationDto.sent_at !== null && updateNotificationDto.sent_at !== undefined ? new Date(updateNotificationDto.sent_at) : undefined,
    };
    return this.prisma.notification.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    return this.prisma.notification.findMany();
  }

  async findOne(id: number) {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.notification.delete({ where: { id } });
  }
}