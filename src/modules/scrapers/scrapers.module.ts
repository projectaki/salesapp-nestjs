import { Module } from '@nestjs/common';
import { ElgigantenScraperService } from './elgiganten-scraper/elgiganten-scraper.service';

@Module({
  imports: [],
  providers: [ElgigantenScraperService],
  exports: [ElgigantenScraperService],
})
export class ScrapersModule {}
