import { Controller, Get } from '@nestjs/common';
import { Public } from './core/auth/public-route-decorator';

@Controller('app')
export class AppController {
  @Public()
  @Get()
  getHello(): string {
    return 'salesapp';
  }
}
