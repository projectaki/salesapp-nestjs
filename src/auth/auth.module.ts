import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { Auth0ManagementApiService } from './auth0-management-api/auth0-management-api.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    JwtStrategy,
    {
      // Global guard for all routes
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    Auth0ManagementApiService,
  ],
  exports: [PassportModule, Auth0ManagementApiService],
})
export class AuthModule {}
