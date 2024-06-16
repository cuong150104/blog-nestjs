import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { registerUserDto } from './dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() registerUserDto: registerUserDto): Promise<User> {
        console.log("register api");
        console.log(registerUserDto);
        return this.authService.register(registerUserDto);
    }

}
