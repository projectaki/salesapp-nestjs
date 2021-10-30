import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { AuthModule } from 'src/core/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
