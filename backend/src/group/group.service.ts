import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createGroupDto: CreateGroupDto) {
        let formattedDate: Date | undefined = undefined;
        if (createGroupDto.created_at) {
            formattedDate = new Date(createGroupDto.created_at);
            formattedDate.setUTCHours(0, 0, 0, 0);
        }

        return await this.prisma.group.create({
            data: {
                name: createGroupDto.name,
                min_age: createGroupDto.min_age,
                max_age: createGroupDto.max_age,
                created_at: formattedDate,
                teachers: {
                    connect: createGroupDto.teacher_ids?.map(id => ({ id })) || [],
                },
            },
            include: { teachers: true },
        });
    }

    async findAll() {
        const groups = await this.prisma.group.findMany({
            include: { teachers: true },
        });

        return groups.map(group => ({
            ...group,
            created_at: group.created_at ? group.created_at.toISOString().split('T')[0] : null,
        }));
    }

    async findOne(id: number) {
        const group = await this.prisma.group.findUnique({
            where: { id },
            include: { teachers: true },
        });

        if (!group) return null;

        return {
            ...group,
            created_at: group.created_at ? group.created_at.toISOString().split('T')[0] : null,
        };
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        let formattedDate: Date | undefined = undefined;
        if (updateGroupDto.created_at) {
            formattedDate = new Date(updateGroupDto.created_at);
            formattedDate.setUTCHours(0, 0, 0, 0);
        }

        const updatedGroup = await this.prisma.group.update({
            where: { id },
            data: {
                name: updateGroupDto.name,
                min_age: updateGroupDto.min_age,
                max_age: updateGroupDto.max_age,
                created_at: formattedDate,
                teachers: {
                    set: updateGroupDto.teacher_ids?.map(id => ({ id })) || [],
                },
            },
            include: { teachers: true },
        });

        return {
            ...updatedGroup,
            created_at: updatedGroup.created_at ? updatedGroup.created_at.toISOString().split('T')[0] : null,
        };
    }

    async remove(id: number) {
        return await this.prisma.group.delete({ where: { id } });
    }
}
