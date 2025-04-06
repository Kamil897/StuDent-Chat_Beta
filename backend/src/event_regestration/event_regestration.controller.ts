import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventRegistrationService } from './event_regestration.service';
import { CreateEventRegistrationDto, UpdateEventRegistrationDto } from './dto';

@Controller('event-registration')
export class EventRegistrationController {
  constructor(private readonly eventRegistrationService: EventRegistrationService) {}

  @Post()
  create(@Body() createEventRegistrationDto: CreateEventRegistrationDto) {
    return this.eventRegistrationService.create(createEventRegistrationDto);
  }

  @Get()
  findAll() {
    return this.eventRegistrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventRegistrationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventRegistrationDto: UpdateEventRegistrationDto) {
    return this.eventRegistrationService.update(+id, updateEventRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventRegistrationService.remove(+id);
  }
}
