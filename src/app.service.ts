import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return { name: 'supportdesk-api' };
  }

  getHealth() {
    return { status: "ok", app: "supportdesk-api" }
  }
}
