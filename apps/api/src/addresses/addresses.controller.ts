import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllAddresses() {
    return this.addressesService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.addressesService.findById(id);
  }

  @Post()
  createAddress(@Body() addressData: CreateAddressDto) {
    return this.addressesService.createAddress(addressData);
  }
}
