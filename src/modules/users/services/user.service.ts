import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateInput } from '../models/input-types/user-create-input';
import { UserUpdateInput } from '../models/input-types/user-update-input';
import { User, UserDocument } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create = async (user: UserCreateInput): Promise<User> => {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  };

  update = async (user: UserUpdateInput): Promise<User> => {
    const { _id, ...updateModel } = user;
    const updated = await this.userModel
      .findByIdAndUpdate(_id, updateModel, { new: true })
      .exec();
    return updated;
  };

  findById = async (id: string, paths: string[] = []): Promise<User> => {
    const pathsWithoutRefs = paths.filter(
      (x) => !x.startsWith('subscriptions'),
    );
    pathsWithoutRefs.push('subscriptions');
    const res = await this.userModel.findById(id, pathsWithoutRefs).exec();
    return res;
  };

  // find = async (params: any): Promise<User> => {
  //   return this.userModel.findOne(params).exec();
  // };

  // remove = async (user: User): Promise<User> => {
  //   return this.userModel.remove(user).exec();
  // };
}
