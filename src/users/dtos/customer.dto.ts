import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class Skills {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Skills)
  readonly skills: Skills[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
