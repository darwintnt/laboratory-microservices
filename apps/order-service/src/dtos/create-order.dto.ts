import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatusList } from '../enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  totalAmount!: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  totalItems!: number;

  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList.join(',')}`,
  })
  @IsOptional()
  status: string = 'PENDING';

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}
