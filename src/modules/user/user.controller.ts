import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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
  index(@Query() query: { keyword?: string; category?: string }) {
    return {
      keyword: query.keyword,
      category: query.category,
    };
  }

  @Get('/:id') // GET /users/:id
  find(@Param('id') id: string) {
    return 'find user ' + id;
  }

  @Post() // POST /users
  create(@Body() body: { name: string; email: string }) {
    return {
      name: body.name,
      email: body.email,
    };
  }

  @Delete() // DELETE /users
  delete() {
    return 'delete user';
  }
}
