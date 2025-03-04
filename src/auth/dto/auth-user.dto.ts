import { IsEmail, IsString } from "class-validator";

export class AuthUserDto {
    
    @IsEmail()
    @IsString()
    email: string;
    
    @IsString()
    password: string;
}