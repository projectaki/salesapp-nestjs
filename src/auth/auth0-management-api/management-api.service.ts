import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';

@Injectable()
export class ManagementApiService {
  constructor(private configService: ConfigService) {}
  auth0: ManagementClient = new ManagementClient({
    domain: this.configService.get<string>('DOMAIN'),
    clientId: this.configService.get<string>('CLIENT_ID'),
    clientSecret: this.configService.get<string>('CLIENT_SECRET'),
  });

  GetUsers = () => {
    return this.auth0.getUsers();
  };
}
