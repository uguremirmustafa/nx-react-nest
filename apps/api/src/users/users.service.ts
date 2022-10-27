import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll() {
    return this.usersRepository.find();
  }

  async getAllWithAddresses() {
    return this.usersRepository.find({ relations: ['addresses'] });
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      return user;
    }
    throw new HttpException(
      'there is no user with this email',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (user) {
      return user;
    }
    throw new HttpException(
      'there is no user with this id',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(createData: CreateUserDto) {
    const newUser = await this.usersRepository.create(createData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getById(id);

    const updatedUser = {
      ...user,
      ...updateUserDto,
    };
    try {
      await this.usersRepository.update(id, updatedUser);
      return this.getById(id);
    } catch (error) {
      throw new HttpException(
        'failed to update the user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const hashedRT = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken: hashedRT,
    });
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
