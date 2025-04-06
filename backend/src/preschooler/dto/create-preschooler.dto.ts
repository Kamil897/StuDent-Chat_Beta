import { IsString, IsEnum, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePreschoolerDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @Transform(({ value }) => new Date(value)) // 🟢 Автоматически преобразует строку в `Date`
  @IsDate()
  registration_date: Date;

  @Transform(({ value }) => new Date(value)) // 🟢 То же самое для `born_date`
  @IsDate()
  born_date: Date;

  @IsEnum(['male', 'female'])
  gender: string;
}
