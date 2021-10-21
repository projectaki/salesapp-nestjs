import { Test, TestingModule } from '@nestjs/testing';
import { Auth0ManagementApiService } from './auth0-management-api.service';

describe('Auth0ManagementApiService', () => {
  let service: Auth0ManagementApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth0ManagementApiService],
    }).compile();

    service = module.get<Auth0ManagementApiService>(Auth0ManagementApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
