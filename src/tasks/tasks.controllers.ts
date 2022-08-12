import { Body, Controller, Get, Post } from '@nestjs/common'
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

    @Post()
    createTasks(@Body() createTasksDto:CreateTasksDto):TasksInterface{
        return this.tasksService.createTasks(createTasksDto)
    }
}