import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    // constructor(private userService: UsersService){}

    // signUp(authDto:AuthDto){
    //     return this.userService.signUp(authDto)
    // }
}
