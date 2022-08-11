export interface TasksInterface {
    id: string,
    title: string,
    description: string,
    status: TasksStatus
}

export enum TasksStatus {
    OPEN = 'DONE',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}