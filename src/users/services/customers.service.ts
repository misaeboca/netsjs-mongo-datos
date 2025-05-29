import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  findOne(id: string) {
    const customer = this.customerModel.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }

  update(id: string, changes: UpdateCustomerDto) {
    const updated = this.customerModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Customer #${id} not found`);
    }

    return updated;
  }

  remove(id: string) {
    const deleted = this.customerModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return deleted;
  }
}
