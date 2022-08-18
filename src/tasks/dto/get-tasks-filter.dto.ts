import { TasksStatus } from '../tasks.interface';
export class GetTasksFilterDto {
    search : string
    status: TasksStatus
}