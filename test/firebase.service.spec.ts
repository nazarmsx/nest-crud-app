import { FirebaseRepository } from '../src/firebase-admin/firebase.repository';

import { Test } from '@nestjs/testing';

describe('UserController', () => {
  let firebase: FirebaseRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [FirebaseRepository],
    }).compile();

    firebase = moduleRef.get<FirebaseRepository>(FirebaseRepository);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = ['test'] as any;
      jest.spyOn(firebase, 'getUsers').mockImplementation(() => result);
      expect(await firebase.getUsers()).toBe(result);
    });
  });
});
