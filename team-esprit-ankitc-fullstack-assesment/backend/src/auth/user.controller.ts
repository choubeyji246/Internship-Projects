import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CustomResponse } from 'src/utils/response';

@Controller('auth')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService.create(createUserDto);
    return new CustomResponse(200, {
      message: 'Rgistration successfull',
      data: data,
    });
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.login(loginUserDto);
    return new CustomResponse(200, {
      message: 'successfully logged in',
      data: token,
    });
  }
}
