import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateTasksDto } from './dto/create-tasks.dto'
import { TasksInterface } from './tasks.interface'
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
        return this.tasksService.getTasksById(id)
    }

    @Post()
    createTasks(@Body() createTasksDto:CreateTasksDto):TasksInterface{
        return this.tasksService.createTasks(createTasksDto)
    }

    @Delete(':id')
    deleteTasks(@Param('id') id:string){
        return this.tasksService.deleteTasks(id)
    }
}