import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule} from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CustomError } from './utils/response';
import { Exam } from './entities/exam.entity';
import { Class } from './entities/class.entity';
import { Result } from './entities/result.enity';
import { MarksModule } from './marks/marks.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:(configService: ConfigService) =>({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Exam, Class, Result ],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    
    AuthModule,
    MarksModule
  ], 
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomError,
    },
  ],
})
export class AppModule {}
