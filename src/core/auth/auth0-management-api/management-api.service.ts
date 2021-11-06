import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient, AuthenticationClient } from 'auth0';

@Injectable()
export class ManagementApiService {
  constructor(private configService: ConfigService) {}
  manager: ManagementClient = new ManagementClient({
    domain: this.configService.get<string>('DOMAIN'),
    clientId: this.configService.get<string>('CLIENT_ID'),
    clientSecret: this.configService.get<string>('CLIENT_SECRET'),
  });

  authenticator = new AuthenticationClient({
    domain: this.configService.get<string>('DOMAIN'),
    clientId: this.configService.get<string>('CLIENT_ID'),
  });

  getUsers = () => {
    return this.manager.getUsers();
  };

  resetPasswordEmail = (email) => {
    this.authenticator
      .requestChangePasswordEmail({
        email,
        connection: 'Username-Password-Authentication',
      })
      .then();
  };

  updatePreferences(id: string, metadata: any) {
    return this.manager.updateUserMetadata({ id }, metadata);
  }
}
