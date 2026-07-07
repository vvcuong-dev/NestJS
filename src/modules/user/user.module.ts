import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from '../../database/database.service';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])], // Thêm TypeOrmModule vào imports
})
export class UserModule {}
