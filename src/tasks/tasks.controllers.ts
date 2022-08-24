import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common'
import { CreateTasksDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatus } from './task-status.enum';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service'


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTask(){
        return this.tasksService.getTasks()
    }

    @Get(':id')
    getTasksById(@Param('id', ParseIntPipe) id:number ):Promise<Task>{
        return this.tasksService.getTaskById(id)
    }

    @Patch(':id')
    updateTaskStatus(@Body('status') status:TasksStatus, @Param('id', ParseIntPipe) id:number ){
        return this.tasksService.updateTaskStatus(id, status)
    }

    @UsePipes(ValidationPipe)
    @Post()
    createTask(@Body() createTasksDto:CreateTasksDto){
        return this.tasksService.createTask(createTasksDto)
    }
    
    @Delete(':id')
    deleteTask(@Param('id') id:number): Promise<void>{
        return this.tasksService.deleteTask(id)
    }


}