import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';

@Injectable()
export class ManagementApiService {
  auth0: ManagementClient = new ManagementClient({
    domain: 'dev--ihngka6.eu.auth0.com',
    clientId: 'KFOHGW9V5eP95S2BCDrBfoV906R1HF5c',
    clientSecret:
      '84PnJImRX34j-rCoJ6tzDdB35g4KcQm8fIL2cBjU2QWiQGT2zwyYMM5nOLydgTBQ',
  });

  GetUsers = () => {
    return this.auth0.getUsers();
  };
}
