import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength, IsAlphanumeric, IsDateString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsAlphanumeric()
  password: string;

  @IsNotEmpty()
  @IsDateString()
  readonly lastActive: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly createdAt: Date;

  @IsString()
  @IsNotEmpty()
  firebaseUid: string;

  salt: string;

}
