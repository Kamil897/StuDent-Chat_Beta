import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParentDto, UpdateParentDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ParentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParentDto: CreateParentDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createParentDto.hashed_password, saltOrRounds);

    return this.prisma.parent.create({
      data: {
        first_name: createParentDto.first_name,
        last_name: createParentDto.last_name,
        number: createParentDto.number,
        email: createParentDto.email,
        address: createParentDto.address,
        hashed_password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.parent.findMany();
  }

  async findOne(id: number) {
    return this.prisma.parent.findUnique({ where: { id } });
  }

  async update(id: number, updateParentDto: UpdateParentDto) {
    return this.prisma.parent.update({
      where: { id },
      data: updateParentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.parent.delete({ where: { id } });
  }
}
