import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Welcome to Amo Ordering Application api, to view the documentatiion go to /api-docs';
  }
}
