import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bossa Nova Solutions is fully operational and running smoothly';
  }
}
