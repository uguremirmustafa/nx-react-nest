import { IsNumber } from 'class-validator';

export class UserID {
  @IsNumber()
  id: number;
}
