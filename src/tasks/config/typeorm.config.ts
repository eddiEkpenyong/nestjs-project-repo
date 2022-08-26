import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from '../tasks.entity';
import { UserEntity } from '../../users/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestjs', 
    entities: [Task, UserEntity],
    synchronize: true,

}