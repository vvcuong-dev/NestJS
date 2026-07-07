import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: { email: string; password: string }) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      // sign nghĩa là sẽ tạo ra một token dựa trên payload và secret key đã được cấu hình trong JwtModule còn
      // verify nghĩa là sẽ kiểm tra xem token có hợp lệ hay không dựa trên secret key đã được cấu hình trong JwtModule
    };
  }
}
