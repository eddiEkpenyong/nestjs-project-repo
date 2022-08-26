import { Body, Controller, Post, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AuthDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private userService:UsersService){}

    @Post('signUp')
    // @UsePipes()
    signUpUser(@Body(ValidationPipe) authDto:AuthDto){
        return this.userService.signUp(authDto)
    }
}
