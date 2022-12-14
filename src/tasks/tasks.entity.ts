import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TasksStatus } from './task-status.enum';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id:number 

    @Column()
    title: string

    @Column() 
    description: string

    @Column()
    status:TasksStatus
}