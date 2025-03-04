import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdateTodoDto {
    @IsString()
    @IsNotEmpty()
    title?: string
    
    @IsString()
    description?: string

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean
}