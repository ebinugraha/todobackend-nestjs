import { IsAlpha, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsAlpha()
    name: string;
    
    @IsEmail()
    @IsString()
    email: string;
    
    @IsString()
    password: string;
}