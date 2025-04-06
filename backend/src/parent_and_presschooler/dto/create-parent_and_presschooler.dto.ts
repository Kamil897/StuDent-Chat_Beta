import { IsInt, IsString } from 'class-validator';

export class CreateParentAndPreschoolDto {
  @IsInt()
  preschooler_id: number;

  @IsInt()
  parent_id: number;

  @IsString()
  relation: string;
}
