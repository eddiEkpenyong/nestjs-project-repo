import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controllers';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TasksService],
    controllers: [TasksController]
})
export class TasksModule{}