import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    console.log('instance user controller created');
  }

  @Get() // GET /users
  index() {
    return [this.userService.getUser(), this.authService.login()];
  }
}
