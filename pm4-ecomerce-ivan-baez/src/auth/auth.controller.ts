import { Body, Controller, Get,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }
  //*POST auth/signin
  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const{ email,password } = credentials;
    return this.authService.signIn(email, password);
  }

   @Post("signup")
  signUp(@Body() newUserData: CreateUserDto){
    return this.authService.signUp(newUserData);
  }

}


