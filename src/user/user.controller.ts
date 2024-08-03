import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async сreateUser(
    @Res() response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
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

  @Get('user/:id')
  async getStudent(@Res() response, @Param('id') userId: string) {
    try {
      const user = await this.userService.getUser(userId);
      return response.status(HttpStatus.OK).json({
        user
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('user/:id')
  async deleteStudent(@Res() response, @Param('id') userId: string) {
    try {
      const deletedStudent = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json();
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
