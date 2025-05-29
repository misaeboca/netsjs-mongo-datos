import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { CustomerController } from 'src/users/controllers/customers.controller';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { Product, ProductSchema } from './entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';
import { Customer, CustomerSchema } from 'src/users/entities/customer.entity';

import { Category, CategorySchema } from './entities/category.entity';
import { CustomersService } from 'src/users/services/customers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [
    ProductsController,
    CategoriesController,
    BrandsController,
    CustomerController,
  ],
  providers: [
    ProductsService,
    BrandsService,
    CategoriesService,
    CustomersService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
