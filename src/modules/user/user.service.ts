import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser() {
    return 'Hello, this is the User service';
  }
}
