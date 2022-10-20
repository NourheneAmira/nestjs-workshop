import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FirstMiddelwareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('je suis le first middelware');
    next();
  }
}
