import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}

    signUp(authDto: AuthDto) {
        const user = this.userRepository.create(authDto)
        return this.userRepository.save(user)
    }
}
 