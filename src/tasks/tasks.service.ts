import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { TasksStatus } from './task-status.enum';


@Injectable()
export class TasksService{

   constructor(
      @InjectRepository(Task)
      private taskRepository : Repository<Task>
   ){}

   getTasks(){
      return this.taskRepository.find()
   }

   // getAllTasks(){
   //  return this.tasks
   // }
      
   // getTasksWithFilters(filterDto: GetTasksFilterDto):TasksInterface[]{
   //   const { search, status} = filterDto
   //    let tasks = this.getAllTasks()

   //  /  if(status){
   //     tasks = tasks.filter( task => task.status === status )
   //    }

   //    if(search){
   //     tasks =  tasks.filter(task => task.title.includes(search) || 
   //       task.description.includes(search))
   //    }

   //    return tasks
   // }

   //REPOSITORY DESIGN PATTERN
   async getTaskById(id:number): Promise<Task> {
      const task = await this.taskRepository.findOneBy({ id })

      if(!task){
         throw new NotFoundException(`Task with "${id} not found`)
      }
      else return task
   }

   createTask(createTasksDto:CreateTasksDto){
      const task = this.taskRepository.create(createTasksDto)
      task.status = TasksStatus.OPEN
      return this.taskRepository.save(task)
   }

   async updateTaskStatus(id:number, status:TasksStatus){
      const task = await this.getTaskById(id)
      task.status = status
      return this.taskRepository.save(task)
   }

   async deleteTask(id:number) : Promise<void>{
   const result = await this.taskRepository.delete(id)
   if(result.affected === 0){
      throw new NotFoundException(`Task with "${id} not found`)
      }
   }
}