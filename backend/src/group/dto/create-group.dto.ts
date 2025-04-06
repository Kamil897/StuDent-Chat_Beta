import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateGroupDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    min_age: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    max_age: number;

    @ApiProperty()
    @Type(() => Date) 
    @IsDate()
    @IsNotEmpty()
    created_at: Date;

    @ApiProperty({ type: [Number] }) // Теперь это массив ID учителей
    @IsNotEmpty()
    @IsInt({ each: true }) 
    teacher_ids: number[];
}
