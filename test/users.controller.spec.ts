import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/services/user.service';
import { Test } from '@nestjs/testing';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'] as any;
      jest.spyOn(userService, 'getAllUsers').mockImplementation(() => result);
      expect(await userService.getAllUsers()).toBe(result);
    });
  });
});
