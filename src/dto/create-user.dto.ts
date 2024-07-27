import { IsNotEmpty, IsEmail, IsString, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: number;
}