import { Injectable } from '@nestjs/common';
import { TasksInterface } from './tasks.interface';

@Injectable()
export class TasksService{
   private tasks: TasksInterface[] = []

   getAllTasks(): TasksInterface[] {
    return this.tasks
   }

}