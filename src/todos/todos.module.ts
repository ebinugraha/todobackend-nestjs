import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoService } from './service/todo.service';

@Module({
  controllers: [ControllerController],
  providers: [TodoService, PrismaService]
})

export class TodosModule {}
