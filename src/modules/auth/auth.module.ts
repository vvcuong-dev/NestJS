import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../passports/local.strategy';
import { JwtStrategy } from '../../passports/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  // providers: [AuthService], // Đăng ký AuthService và LocalStrategy để sử dụng trong AuthController
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:
        '58d2938f4cf118adf6af4c7a7cb6eb7a2a2a3d2cbda60252a7da099826b19c0d', // Thay đổi secret key theo nhu cầu của bạn,
      signOptions: { expiresIn: '1h' }, // Thời gian hết hạn của token (ví dụ: 1 giờ)
    }),
  ], // Import UserModule và JwtModule để sử dụng UserService và JwtService trong AuthService
})
export class AuthModule {}
