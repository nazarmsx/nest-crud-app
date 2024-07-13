import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';
import {
  Document
} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  registerDate: Date;
}

export const UserDocument = SchemaFactory.createForClass(User);