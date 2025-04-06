import { PartialType } from '@nestjs/swagger';
import { CreateEventRegistrationDto } from './create-event_regestration.dto';

export class UpdateEventRegistrationDto extends PartialType(CreateEventRegistrationDto) {}
