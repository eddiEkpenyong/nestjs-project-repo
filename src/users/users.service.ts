import { ConflictException, Injectable, InternalServerErrorException,  } from '@nestjs/common';
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

  async signUp(authDto: AuthDto) {
        const user = this.userRepository.create(authDto)

        try{
            await this.userRepository.save(user)
            return user
        }
        
        catch(error){
            if(error.code === "ER_DUP_ENTRY"){
                throw new ConflictException("username already exists")
            }
            else {
                throw new InternalServerErrorException()
            }
        }
    }
}
 