import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create = (user: User): Promise<User> => {
    return this.userRepository.save(user);
  };

  update = async (user: User): Promise<User> => {
    const existingUser = await this.userRepository.findOne({
      authId: user.authId,
    });
    const updatedUser = { ...existingUser, ...user };
    return this.userRepository.save(updatedUser);
  };

  find(params: any): Promise<User> {
    return this.userRepository.findOne(params);
  }

  remove = (user: User): Promise<User> => {
    return this.userRepository.remove(user);
  };
}
