import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: { email: string; password: string; id: number }) {
    const payload = { email: user.email, id: user.id };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' }); // Thời gian hết hạn của refresh token (ví dụ: 7 ngày)

    // Lưu refresh token vào cơ sở dữ liệu
    await this.userService.saveRefreshToken(user.id, refreshToken);

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }

  verifyRefreshToken(refreshToken: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const decoded = this.jwtService.decode(refreshToken);
    if (decoded) {
      const status = this.userService.verifyRefreshToken(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        decoded.id,
        refreshToken,
      );
      return status;
    }
    return false;
  }
}
