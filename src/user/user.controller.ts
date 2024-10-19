import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';
import {FirebaseRepository} from '../firebase-admin/firebase.repository';
import * as bcrypt from 'bcrypt';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly firebaseRepository: FirebaseRepository) {}

  @Get('users')
  async getUsers(@Res() response) {
    try {
      const users = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        users
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('user')
  async createUser(
    @Res() response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {

      const salt = await bcrypt.genSalt();
      const password = 'random_password';
      createUserDto.password = await bcrypt.hash(password, salt);;
      createUserDto.salt = salt;
      const newUser = await this.userService.createUser(
        createUserDto,
      );
      return response.status(HttpStatus.CREATED).json({
        user: newUser
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('user/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        user
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('user/:id')
  async getStudent(@Res() response, @Param('id') userId: string) {
    try {
      const user = await this.userService.getUser(userId);
      const responseUser = user.toObject();
      delete responseUser.password;
      delete responseUser.salt;
      return response.status(HttpStatus.OK).json({
        user: responseUser
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('user/:id')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json();
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('firebase-users')
  async getFirebaseUsers(@Res() response) {
    try {
      const users = await this.firebaseRepository.getUsers();
      return response.status(HttpStatus.OK).json({
        users
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


}
