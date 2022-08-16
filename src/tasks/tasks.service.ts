import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { TasksInterface, TasksStatus } from './tasks.interface';


@Injectable()
export class TasksService{
   private tasks: TasksInterface[] = []

   getAllTasks(): TasksInterface[] {
    return this.tasks
   }

   getTasksById(id: string): TasksInterface{
      return this.tasks.find((task) => task.id === id)
   }

   createTasks(createTasksDto:CreateTasksDto): TasksInterface{

      const {title, description} = createTasksDto

      const task:TasksInterface = {
         id: uuidv4(),
         title,
         description,
         status: TasksStatus.OPEN
      }

      this.tasks.push(task)
      return task
   }

   updateTaskStatus(status:TasksStatus, id:string){
      const task = this.getTasksById(id)
      task.status = status
      return task
   }

   deleteTasks(id:string){
      this.tasks = this.tasks.filter((task) => task.id !== id)
      return this.tasks
   }
}