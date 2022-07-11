import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.models';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
constructor (private taskService: TasksService){}

    @Get()
    getAllTasks():Task[]{
        return this.taskService.getAllTask();
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);

    }
    @Delete('/:id')
    deleteTaskById(@Param ('id')id:string):void{
        this.taskService.deleteTaskByID(id);

    }
    
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
       return this.taskService.createTask(createTaskDto)

    }
}



