import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, Query } from '@nestjs/common'
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksInterface, TasksStatus } from './tasks.interface';
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTasksFilterDto): TasksInterface[]{

        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto)
        }
        else return this.tasksService.getAllTasks()
    }

    @Get(':id')
    getTasksById(@Param('id') id:string ):TasksInterface{
        return this.tasksService.getTasksById(id)
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