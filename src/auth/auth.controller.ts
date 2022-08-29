import { Body, Controller, Post, ValidationPipe, HttpStatus, UsePipes } from '@nestjs/common';
import { AuthDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private userService:UsersService){}

    @Post('signup')
    @UsePipes(new ValidationPipe({errorHttpStatusCode:HttpStatus.UNPROCESSABLE_ENTITY}))
    signUp(@Body() authDto:AuthDto){
        return this.userService.signUp(authDto)
    }

    @Post('login')
    @UsePipes(new ValidationPipe({errorHttpStatusCode:HttpStatus.UNPROCESSABLE_ENTITY}))
    signIn(@Body() authDto:AuthDto){
        return this.userService.signIn(authDto)
    }
}
