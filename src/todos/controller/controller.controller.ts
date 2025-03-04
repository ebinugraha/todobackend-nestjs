import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class ControllerController {

    constructor(private todoService: TodoService) {}

    @Get(':userId')
    @HttpCode(200)
    findAll(@Param('userId') userId: string){
        return this.todoService.findAll(userId);
    }

    @Get(':userId/:id')
    @HttpCode(200)
    getOneTodo(@Param('userId') userId: string, @Param('id') id: string){
        return this.todoService.findOne(id, userId);
    }

    @Post(':userId')
    @HttpCode(201)
    createTodo(@Param('userId') userId: string, @Body() dto: CreateTodoDto){
        return this.todoService.create(userId, dto);
    }

    @Put(':userId/:id')
    @HttpCode(200)
    updateTodo(@Param('userId') userId: string, @Param('id') id: string, @Body() dto: UpdateTodoDto){
        return this.todoService.update(id, userId, dto);
    }

    @Delete(':userId/:id')
    @HttpCode(200)
    deleteTodo(@Param('userId') userId: string, @Param('id') id: string){
        return this.todoService.remove(id, userId);
    }

}
