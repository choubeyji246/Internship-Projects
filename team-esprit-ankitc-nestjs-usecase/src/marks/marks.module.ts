import { Module } from '@nestjs/common';
import { MarksController } from './marks.controller';
import { MarksService } from './marks.service';
import { Result } from 'src/entities/result.enity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([ Result]),
  MulterModule.register({
    dest:'./uploads',
  })

],
  controllers: [MarksController],
  providers: [MarksService,JwtService]
})
export class MarksModule {}
