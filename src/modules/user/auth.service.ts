import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return 'Hello, this is the Auth service';
  }
}
