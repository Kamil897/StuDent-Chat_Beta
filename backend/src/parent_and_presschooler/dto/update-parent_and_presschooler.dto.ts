import { PartialType } from '@nestjs/mapped-types';
import { CreateParentAndPreschoolDto } from './create-parent_and_presschooler.dto';

export class UpdateParentAndPreschoolDto extends PartialType(CreateParentAndPreschoolDto) {}
