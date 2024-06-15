import { Controller, Post, Body } from '@nestjs/common';
import { AuthService} from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CustomResponse } from 'src/utils/response';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService
    ) {}

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.loginUser(loginUserDto);
    return new CustomResponse(200, {message:'successfully logged in', data:token})
  }

 
}
