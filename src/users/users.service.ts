import { ConflictException, Injectable, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async getbyUsername(username:string): Promise<UserEntity>{
        const user = await this.userRepository.findOneBy({ username })
        if(!user){
            throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED)
        }
        return user
    }

    //The SignUp function for registering a new user
    async signUp(authDto: AuthDto) {

        //generating a salt that would be used in hashing the password
        const salt = await bcrypt.genSalt()

        //extracting the password from the authDto
        const { password } = authDto

        //creating the user
        const user = this.userRepository.create(authDto)

        //updating the salt and password fields
        user.salt = salt
        user.password = await bcrypt.hash(password, salt)

        //saving the user to the db
        try {
            await this.userRepository.save(user)
            return user
        }

        //checking if the username is already existing on the database
        catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new ConflictException("username already exists")
            }
            else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn(authDto: AuthDto): Promise<string> {
        //extracting the username and password from the dto
        const { username, password } = authDto

        //finding a user by the username
        const user = this.getbyUsername(username)

        //comparing the password with that of the database
        const isMatch = await bcrypt.compare(password, (await user).password);
        
        //checking if user exists and if passwords match
        if (user && isMatch) {
            return (await user).username
        }
        else throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED)
    }
}
