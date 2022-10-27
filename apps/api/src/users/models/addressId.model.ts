import { IsNumber } from 'class-validator';

export class AddressID {
  @IsNumber()
  id: number;
}
