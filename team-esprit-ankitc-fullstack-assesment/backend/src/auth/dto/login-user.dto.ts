import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString({ message: 'Password must be a string' })
    @MinLength(4)
    @MaxLength(20)
    password: string;
    
}