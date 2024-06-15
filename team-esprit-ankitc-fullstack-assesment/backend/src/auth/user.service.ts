import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/hashing';
import { CustomError } from 'src/utils/response';
import { ShippingAddress } from './entities/address.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ShippingAddress)
    private shippingRepository: Repository<ShippingAddress>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = hashPassword(createUserDto.password);
      const { name, email, password } = createUserDto;
      const { address } = createUserDto;

      const data = await this.userRepository.save({ name, email, password });
      const addressData = await this.shippingRepository.save({
        address,
        user_id: { id: data.id },
      });

      return data;
    } catch (error) {
      throw new CustomError(error.status || 500, error.message);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      loginUserDto.password = hashPassword(loginUserDto.password);

      const { email } = loginUserDto;

      let user = await this.userRepository.findOne({ where: { email: email } });

      if (!user || loginUserDto.password !== user.password) {
        throw new CustomError(403, 'inavalid credentials');
      } else {
        const token = this.jwtService.sign({
          userId: user.id,
          userEmail: user.email,
        });
        return token;
      }
    } catch (error) {
      throw new CustomError(error.status || 500, error.message);
    }
  }
}
