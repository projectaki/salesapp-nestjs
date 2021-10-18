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

  update = (user: User): Promise<User> => {
    return this.userRepository.save(user);
  };

  find(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  remove = (user: User): Promise<User> => {
    return this.userRepository.remove(user);
  };
}
