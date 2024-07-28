import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../user/user.model';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`Student #${userId} not found`);
    }
    return existingUser;
  }

  async getAllUsers(): Promise<UserDocument[]> {
    const users = await this.userModel.find();
    if (!users || users.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return users;
  }

  async getUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async deleteUser(userId: string): Promise<UserDocument> {
    const userToDelete = await this.userModel.findByIdAndDelete(userId);
    if (!userToDelete) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return userToDelete;
  }
}