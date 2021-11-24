import { Test } from '@nestjs/testing';
import { Product } from 'src/modules/products/models/product.model';
import { ProductService } from 'src/modules/products/services/product.service';
import { User } from '../models/user.model';
import { UserService } from './user.service';

describe('ProductService', () => {
  //let userService: UserService;
  //   const mockRepo = {
  //     findOne: jest.fn(async () => ({ ...new Product(), price: 500 })),
  //     save: jest.fn(async () => new Product()),
  //   };

  //   beforeEach(async () => {
  //     const moduleRef = await Test.createTestingModule({
  //       providers: [
  //         // ProductService,
  //         // {
  //         //   provide: getRepositoryToken(Product),
  //         //   useValue: mockRepo,
  //         // },
  //       ],
  //     }).compile();

  //     userService = moduleRef.get<UserService>(UserService);
  //   });

  describe('User tests', () => {
    it('should be true', async () => {
      const user = new User();
      user.name = 'akos';
      //   jest
      //     .spyOn(mockRepo, 'findOne')
      //     .mockImplementation(async () => ({ ...new Product(), price: 500 }));

      expect(user.name).toBe('akos');
    });
  });
});
