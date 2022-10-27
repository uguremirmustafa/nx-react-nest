import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { UserID } from '../models/userId.model';

export class CreateAddressDto {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  city: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  street: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  zipCode: string;

  //   @IsNumberString()
  //   @IsNotEmpty()
  //   houseNumber: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserID)
  users: UserID[];
}
