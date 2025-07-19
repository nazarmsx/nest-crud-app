import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  createdAt: Date;

  @Prop()
  lastActive: Date;

  @Prop()
  firebaseUid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserEntity {
  _id: string;
  email: string;
  createdAt: Date;
  lastActive: Date;
  firebaseUid: string;

  @Exclude()
  password: string;
  @Exclude()
  salt: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
