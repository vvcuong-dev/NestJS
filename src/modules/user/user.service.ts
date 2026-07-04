import { Injectable, Scope } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable({ scope: Scope.TRANSIENT })
export class UserService {
  constructor(private readonly db: DatabaseService) {
    console.log('instance user service created');
  }
  getUser() {
    return this.db.findAll();
  }
}
