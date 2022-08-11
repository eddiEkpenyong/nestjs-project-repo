import { Controller, Get } from '@nestjs/common'
import { TasksInterface } from './tasks.interface'
import { TaskService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): TasksInterface[]{
        return this.tasksService.getAllTasks()
    }
}