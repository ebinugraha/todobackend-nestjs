import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoService {

    constructor(private prisma: PrismaService) { }

    async findAll(userId: string) {
        return this.prisma.todo.findMany({
            where: {
                userId
            }
        });
    }

    async findOne(id: string, userId: string) {
        return this.prisma.todo.findUnique({
            where: {
                id,
                userId
            }
        })
    }

    async create( userId: string, dto: CreateTodoDto) {
        return await this.prisma.todo.create({
            data: {
                userId,
                ...dto,
            }
        })
    }

    async update(id: string, userId: string, dto: UpdateTodoDto) {
        return this.prisma.todo.update({
            where: {
                id,
                userId
            },
            data: {
                ...dto
            }
        })
    }

    async remove(id: string, userId: string) {
        return this.prisma.todo.delete({
            where: {
                id,
                userId
            }
        })
    }

}
