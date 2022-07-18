import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.models';
import {v4 as uuidv4} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
    private tasks = [];
    

    getAllTask():Task[]{
        return this.tasks;
    }

    getTaskById(id:string): Task{
        const found = this.tasks.find(task => task.id === id);
        if(!found){
            throw new NotFoundException(`task with"${id}" not found`);

        }
    return found;
}

    deleteTaskByID(id:string):void {
        const found = this.getTaskById(id);
      this.tasks = this.tasks.filter(task => task.id !==found.id);
    }
    
    createTask(createTaskDto:CreateTaskDto): Task {
        const {title,description}= createTaskDto;
        const task: Task ={
            id:uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

    this.tasks.push(task);
    return task;
    }
    updateTaskStatus(id: string, status: TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

}
