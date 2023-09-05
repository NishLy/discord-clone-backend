import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserData } from './dto/user.create';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() userData: CreateUserData) {
    try {
      return await this.userService.create(userData);
    } catch (error) {
      throw error;
    }
  }
}
