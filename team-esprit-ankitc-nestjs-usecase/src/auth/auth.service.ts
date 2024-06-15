import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from '../utils/hashing';
import { CustomError } from 'src/utils/response';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}


  async loginUser(loginUserDto: LoginUserDto) {
    try{
      loginUserDto.password = hashPassword(loginUserDto.password);

      const { email } = loginUserDto;

      let user = await this.userRepository.findOne({where:{email:email} })

      if (!user || loginUserDto.password !== user.password) {
        throw new CustomError(403, 'inavalid credentials');
      }else{
        const token = this.jwtService.sign({
          userId:user.id,
          userEmail: user.email,
          role: user.role,
        });
        return token
      }
    }catch (error)
    {
      throw new CustomError(error.status || 500, error.message);
    }

  }


}
