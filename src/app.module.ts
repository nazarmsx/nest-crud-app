import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {UserService} from './services/user.service';
import {UserController} from './user/user.controller';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DATABASE_URI}/${process.env.DB_NAME}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
