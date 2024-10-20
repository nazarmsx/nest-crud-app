import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({cache: false }),
    MongooseModule.forRoot(`${process.env.DATABASE_URI}/${process.env.DB_NAME}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
