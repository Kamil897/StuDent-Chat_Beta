import { PartialType } from '@nestjs/swagger';
import { CreatePreschoolerDto } from './create-preschooler.dto';

export class UpdatePreschoolerDto extends PartialType(CreatePreschoolerDto) {}
