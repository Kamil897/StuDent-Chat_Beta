import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teacher } from '@prisma/client';
import { JwtService } from "@nestjs/jwt";
import * as uuid from 'uuid'
import { MailService } from "src/mail/mail.service";

@Injectable()
export class TeacherService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly mailSerivce: MailService

    ) { }

    async create(createTeacherDto: CreateTeacherDto) {
        if (createTeacherDto.password !== createTeacherDto.confirm_password) {
            throw new BadRequestException("Пароли не совпадают");
        }

        const hashedPassword = await bcrypt.hash(createTeacherDto.password, 7);
        const birthday = new Date(createTeacherDto.birthday);
        if (isNaN(birthday.getTime())) {
            throw new BadRequestException("Некорректный формат даты рождения");
        }

        const verification = uuid.v4();

        const newTeacher = await this.prismaService.teacher.create({
            data: {
                first_name: createTeacherDto.first_name,
                last_name: createTeacherDto.last_name,
                birthday: createTeacherDto.birthday,
                phone_number: createTeacherDto.phone_number,
                gender: createTeacherDto.gender,
                email: createTeacherDto.email,
                password: hashedPassword,
                confirm_password: createTeacherDto.confirm_password,
                hire_date: new Date(),
                old_work: createTeacherDto.old_work ?? null,
                avg_rating: createTeacherDto.avg_rating ?? null,
                is_main: createTeacherDto.is_main ?? false,
                verification
            },
        });

        try {
            await this.mailSerivce.sendMail(newTeacher);
        } catch (error) {
            throw new InternalServerErrorException("Xat yuborishda xatolik");
        }

        return newTeacher;
    }

    async findAll() {
        return await this.prismaService.teacher.findMany();
    }

    async findOne(id: number) {
        const teacher = await this.prismaService.teacher.findUnique({ where: { id } });
        if (!teacher) {
            throw new NotFoundException("Учитель не найден");
        }
        return teacher;
    }

    async findByEmail(email: string): Promise<Teacher | null> {
        return this.prismaService.teacher.findUnique({ where: { email } });
    }

    async update(id: number, updateTeacherDto: UpdateTeacherDto) {
        await this.findOne(id); // Ожидаем, пока выполнится поиск учителя

        return await this.prismaService.teacher.update({
            where: { id },
            data: {
                ...updateTeacherDto,
                birthday: updateTeacherDto.birthday ? updateTeacherDto.birthday.toISOString() : undefined,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id); // Проверяем, что учитель существует
        return await this.prismaService.teacher.delete({ where: { id } });
    }

    async updateRefreshToken(id: number, refresh_token: string | null) {
        const hashedToken = refresh_token ? await bcrypt.hash(refresh_token, 10) : null;

        return await this.prismaService.teacher.update({
            where: { id },
            data: { hashed_refresh_token: hashedToken },
        });
    }

    async getToken(teacher: Teacher) {
        const payload = {
            id: teacher.id,
            email: teacher.email,
        };

        // 🔥 Генерация access-токена (живет 15 минут)
        const access_token = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: "15m",
        });

        // 🔥 Генерация refresh-токена (живет 15 дней)
        const refresh_token = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: "15d",
        });

        return { access_token, refresh_token };
    }

    async getTeacherRating(teacherId: number) {
        const reviews = await this.prismaService.teacherReview.findMany({
            where: { teacher_id: teacherId },
            select: { rating: true },
        });

        if (reviews.length === 0) {
            return { teacher_id: teacherId, average_rating: null, total_reviews: 0 };
        }

        const totalReviews = reviews.length;
        const averageRating =
            reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

        return {
            teacher_id: teacherId,
            average_rating: Number(averageRating.toFixed(2)),
            total_reviews: totalReviews,
        };
    }

    async activate(link: string) {
        if (!link) {
            throw new BadRequestException("Activation link not found");
        }

        try {
            const updateUser = await this.prismaService.teacher.update({
                where: {
                    verification: link,
                    is_active: false, // Faqat aktivlanmagan foydalanuvchini tanlash
                },
                data: {
                    is_active: true,
                },
                select: {
                    id: true,
                    is_active: true,
                },
            });

            return {
                message: "User activated successfully",
                user: updateUser,
            };
        } catch (error) {
            throw new BadRequestException("User already activated or not found");
        }
    }

}
