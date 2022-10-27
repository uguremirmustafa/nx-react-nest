import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/guards/jwtAuthentication.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthenticationGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.getAll();
  }

  @Get('with-addresses')
  @UseInterceptors(ClassSerializerInterceptor)
  findAllWithAddresses() {
    return this.usersService.getAllWithAddresses();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateDto);
  }
}
