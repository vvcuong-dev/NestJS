import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

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
  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
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
  findByEmail(email: string): Promise<User | null> {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }
}
