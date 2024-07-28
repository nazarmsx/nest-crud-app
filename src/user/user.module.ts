import { Module } from '@nestjs/common';
import { UserSchema, User} from '../user/user.model';
import {UserService} from '../services/user.service';
import {UserController} from '../user/user.controller';

import {
  MongooseModule
} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
