import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controllers';

@Module({
    imports: [],
    providers: [],
    controllers: [TasksController]
})
export class TasksModule{}