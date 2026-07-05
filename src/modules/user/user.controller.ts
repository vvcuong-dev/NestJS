import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get() // GET /users
  index() {
    return this.userService.findAll();
  }

  @Get('/:id') // GET /users/:id
  find(@Param('id') id: string) {
    return this.userService.find(parseInt(id));
  }

  @Post() // POST /users
  create(@Body() body: { name: string; email: string; password: string }) {
    return this.userService.create(body);
  }

  @Patch('/:id') // PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string; password?: string },
  ) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }
}
