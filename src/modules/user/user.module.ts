import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { DatabaseService } from '../../database/database.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService, DatabaseService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])], // Thêm TypeOrmModule vào imports
})
export class UserModule {}
