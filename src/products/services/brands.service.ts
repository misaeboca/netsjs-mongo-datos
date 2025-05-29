import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find();
  }

  findOne(id: string) {
    const product = this.brandModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  update(id: string, changes: UpdateBrandDto) {
    const updated = this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return updated;
  }

  remove(id: string) {
    const deleted = this.brandModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return deleted;
  }
}
