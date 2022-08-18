import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksInterface, TasksStatus } from './tasks.interface';


@Injectable()
export class TasksService{
   private tasks: TasksInterface[] = []

   getAllTasks(): TasksInterface[] {
    return this.tasks
   }

   getTasksWithFilters(filterDto: GetTasksFilterDto):TasksInterface[]{
     const { search, status} = filterDto
      let tasks = this.getAllTasks()

      if(status){
       tasks = tasks.filter( task => task.status === status)
      }

      if(search){
         tasks.filter(task => task.title.includes(search) || 
         task.description.includes(search))
      }

      return tasks
   }

   getTasksById(id: string): TasksInterface{
      const task = this.tasks.find((task) => task.id === id)
      if(task){
         return task
     }
     else throw new NotFoundException(`Task with "${id}" not found`)
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
      const checkIfTaskExists = this.getTasksById(id)
      this.tasks = this.tasks.filter((task) => task.id !== checkIfTaskExists.id)
      return this.tasks
   }
}