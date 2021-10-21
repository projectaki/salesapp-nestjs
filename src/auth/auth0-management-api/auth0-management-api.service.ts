import { Injectable } from '@nestjs/common';
import request from 'request';
import axios from 'axios';
import { url } from 'inspector';

@Injectable()
export class Auth0ManagementApiService {
  accessToken: string;

  getAccessToken = () => {
    const options = {
      method: 'POST',
      url: 'https://dev--ihngka6.eu.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"KFOHGW9V5eP95S2BCDrBfoV906R1HF5c","client_secret":"84PnJImRX34j-rCoJ6tzDdB35g4KcQm8fIL2cBjU2QWiQGT2zwyYMM5nOLydgTBQ","audience":"https://dev--ihngka6.eu.auth0.com/api/v2/","grant_type":"client_credentials"}',
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);

      console.log('body', body);
      this.accessToken = body.access_token;
    });
  };

  GetUser = (id: string) => {
    const options = {
      url: `https://dev--ihngka6.eu.auth0.com/api/v2/users/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    };

    axios
      .get(options.url, { headers: options.headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  GetUsers = () => {
    const option = {
      url: `https://dev--ihngka6.eu.auth0.com/api/v2/users}`,
      headers: { authorization: `Bearer ${12}` },
    };

    axios
      .get(option.url, { headers: option.headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
