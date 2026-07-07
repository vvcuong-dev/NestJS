import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('/register') // POST /auth/register
  register(
    @Body() userData: { name: string; email: string; password: string },
  ) {
    return this.userService.create(userData);
  }

  @UseGuards(LocalAuthGuard) // Sử dụng LocalAuthGuard để bảo vệ route này, chỉ cho phép truy cập khi người dùng đã được xác thực
  @Post('/login') // POST /auth/login
  login(@Request() request: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.authService.login(request.user);
  }
  @Get('/profile') // GET /auth/profile
  @UseGuards(JwtAuthGuard) // Sử dụng JwtAuthGuard để bảo vệ route này, chỉ cho phép truy cập khi người dùng đã được xác thực bằng JWT
  getProfile(@Request() request: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return request.user;
  }
}
