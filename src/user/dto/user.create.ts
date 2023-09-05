import { IsEmail, IsBoolean, IsString, Length } from 'class-validator';

export class CreateUserData {
  display_name: string;

  @IsString()
  @Length(3, 30)
  username: string;

  @IsString()
  @Length(8, 50)
  password: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  subscribe_news: boolean;
}
