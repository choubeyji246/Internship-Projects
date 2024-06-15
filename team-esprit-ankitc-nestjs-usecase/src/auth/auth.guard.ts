import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly configService: ConfigService,
      private readonly jwtService: JwtService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
        const { authorization }: any = request.headers;
        if (!authorization) {
          throw new UnauthorizedException('Please provide token');
        }
  
        const decodedData = this.jwtService.verify(authorization, {
          secret: this.configService.get('JWT_SECRET'),
        });
        
        request['id'] = decodedData.userId;
        request['role']=decodedData.role
        return true;
      } catch (error) {
        throw new ForbiddenException(
          error.message || 'session expired! Please sign In',
        );
      }
    }
  }