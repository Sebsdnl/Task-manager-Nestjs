import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './dto/pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.models';
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
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
       return this.taskService.createTask(createTaskDto)

    }
    @Patch(':id/status')
    updateTaskStatus(
        @Param('id')id : string,
        @Body('status', TaskStatusValidationPipe) status : TaskStatus,): Task {
            return this.taskService.updateTaskStatus(id,status);


        }
    }




