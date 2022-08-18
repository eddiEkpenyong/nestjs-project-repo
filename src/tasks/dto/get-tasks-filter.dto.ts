import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TasksStatus } from '../tasks.interface';

export class GetTasksFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search : string

    @IsOptional()
    @IsIn([TasksStatus.DONE, TasksStatus.OPEN, TasksStatus.IN_PROGRESS])
    status: TasksStatus
}