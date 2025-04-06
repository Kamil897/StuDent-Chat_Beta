import { PartialType } from '@nestjs/swagger';
import { CreateGroupPreschoolerDto } from './create-gruop_preschooler.dto';

export class UpdateGruopPreschoolerDto extends PartialType(CreateGroupPreschoolerDto) {}
