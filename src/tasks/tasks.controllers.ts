import { Controller, Get } from '@nestjs/common'
import { TaskService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): tasks[]{
        return this.tasksService.getAllTasks()
    }
}