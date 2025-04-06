import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsDate } from "class-validator";
import { Transform } from "class-transformer";

export class CreateEventDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    admin_id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => {
        // Разбиваем строку "YYYY.MM.DD" на [год, месяц, день]
        const [year, month, day] = value.split('.').map(Number);
        return new Date(year, month - 1, day); // Месяц в `Date` начинается с 0
    })
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    max_preschooler: number;
}
