import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique: true})
    username:string

    @Column()
    password:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    salt:string

    // async validatePassword(password:string): Promise<boolean>{
    //     const hash = await bcrypt.hash(password, this.salt)
    //     return hash === this.password
    // }
}