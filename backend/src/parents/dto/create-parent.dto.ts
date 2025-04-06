import { IsString, IsEmail } from 'class-validator';

export class CreateParentDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  number: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  hashed_password: string;
}
