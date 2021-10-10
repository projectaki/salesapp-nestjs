import { Page } from 'puppeteer';

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export class BaseScrapersService {
  async browserSession<T>(func: (x: Page) => Promise<T>): Promise<T> {
    const browser = await puppeteer.use(StealthPlugin()).launch({
      headless: true,
    });
    const page = await browser.newPage();
    // Set user agent is neccessary to avoid detection
    page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    );

    console.log('Start callback func...');
    const res = await func(page);
    console.log('Finish callback func...');
    await browser.close();
    return res;
  }
}
