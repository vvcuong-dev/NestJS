import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  find(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
  create(userData: Partial<User>): Promise<User> {
    //Partial nghĩa là userData có thể chứa một phần các thuộc tính của User, không cần phải đầy đủ tất cả
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData); // update thì không cần save, chỉ cần update là đủ
    return this.userRepository.findOneBy({ id });
  }
  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null; // Nếu không tìm thấy user thì trả về null
    }
    await this.userRepository.delete(id);
    return user;
  }
}
