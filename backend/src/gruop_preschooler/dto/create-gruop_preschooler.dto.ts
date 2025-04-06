import { IsNumber } from 'class-validator';

export class CreateGroupPreschoolerDto {
  @IsNumber()
  group_id: number;

  @IsNumber()
  preschooler_id: number;
}
