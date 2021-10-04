import { Test, TestingModule } from '@nestjs/testing';
import { ElgigantenScraperService } from './elgiganten-scraper.service';

describe('ElgigantenScraperService', () => {
  let service: ElgigantenScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElgigantenScraperService],
    }).compile();

    service = module.get<ElgigantenScraperService>(ElgigantenScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
