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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createStudent(
    @Res() response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const newUser = await this.userService.createUser(
        createUserDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
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
        message: 'User has been successfully updated',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getStudents(@Res() response) {
    try {
      const studentData = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        studentData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getStudent(@Res() response, @Param('id') userId: string) {
    try {
      const user = await this.userService.getUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') userId: string) {
    try {
      const deletedStudent = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}