import {  IsEnum, IsNumber } from 'class-validator';

export enum EventStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class CreateEventRegistrationDto {
  @IsNumber()
  event_id :number
  @IsNumber()
  preschooler_id :number
}
