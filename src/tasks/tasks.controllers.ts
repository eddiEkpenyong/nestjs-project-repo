import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common'
import { CreateTasksDto } from './dto/create-tasks.dto';
import { TasksInterface, TasksStatus } from './tasks.interface'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): TasksInterface[]{
        return this.tasksService.getAllTasks()
    }

    @Get(':id')
    getTasksById(@Param('id') id:string ):TasksInterface{
        const task = this.tasksService.getTasksById(id)
        if(task){
            return task
        }
        else throw new NotFoundException(`Task with "${id}" not found`)
    }

    @Patch(':id')
    updateTaskStatus(@Body('status') status:TasksStatus, @Param('id') id:string ):TasksInterface{
        return this.tasksService.updateTaskStatus(status,id)
    }

    @UsePipes(ValidationPipe)
    @Post()
    createTasks(@Body() createTasksDto:CreateTasksDto):TasksInterface{
        return this.tasksService.createTasks(createTasksDto)
    }
    
    @Delete(':id')
    deleteTasks(@Param('id') id:string){
        return this.tasksService.deleteTasks(id)
    }
}