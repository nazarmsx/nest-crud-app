import { Module } from '@nestjs/common';
import { UserSchema, User} from './user.model';
import {UserService} from '../services/user.service';
import {UserController} from './user.controller';
import {FirebaseAdminModule} from '../firebase-admin/firebase-admin.module'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ]),
    FirebaseAdminModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
