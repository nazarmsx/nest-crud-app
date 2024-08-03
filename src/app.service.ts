import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getItWorks(): string {
    return 'It works!!';
  }
}
