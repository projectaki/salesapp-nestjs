import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ManagementApiService } from './auth0-management-api/management-api.service';
import { GqlAuthGuard } from './graphql/gql-auth-guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    JwtStrategy,
    {
      // Global guard for all routes, use @Public decorator to open the route
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    ManagementApiService,
  ],
  exports: [PassportModule, ManagementApiService],
})
export class AuthModule {}
