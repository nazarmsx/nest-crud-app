import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user/user.model';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
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

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users || users.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return users;
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    const userToDelete = await this.userModel.findByIdAndDelete(userId);
    if (!userToDelete) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return userToDelete;
  }
}