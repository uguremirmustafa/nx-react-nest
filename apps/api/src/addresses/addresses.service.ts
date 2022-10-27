import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  getAll() {
    return this.addressesRepository.find({ relations: ['users'] });
  }

  async findById(id: number) {
    const post = await this.addressesRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (post) {
      return post;
    }
    throw new NotFoundException(id);
  }

  async createAddress(addressData: CreateAddressDto) {
    const newAddress = await this.addressesRepository.create(addressData);
    await this.addressesRepository.save(newAddress);
    return newAddress;
  }
}
