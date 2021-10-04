import { Module } from '@nestjs/common';
import { BaseScrapersService } from './base-scrapers.service';
import { ElgigantenScraperService } from './elgiganten-scraper/elgiganten-scraper.service';

@Module({
  providers: [BaseScrapersService, ElgigantenScraperService],
})
export class ScrapersModule {}
