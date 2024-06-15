import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CustomError } from 'src/utils/response';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}


  async findAll(params) {
    try {
      console.log(params);
      
      const { page, sortBy, sortOrder, filters } = params;
      const skip = (page - 1) * 10;

      const options: FindManyOptions<Product> = {
        select:["product_id", "product_name","product_model","rating"],
        skip,
        take: 12,
        order: {
          [sortBy]: sortOrder,
        },
        where: filters,
      };

      const data = await this.productRepository.find(options);

      if (!data || data.length === 0) {
        throw new CustomError(404, 'Not found');
      }
      return data;
    } catch (error) {
      throw new CustomError(error.status || 500, error.message);
    }
  }


  async getProductById(productId){
    let product = await this.productRepository.find({select:["product_id","product_name","product_model","price","description","avaibility","rating","type"],
    where:{product_id : productId}});
  
    if(!product){
      throw new CustomError(404,"Not found");
    }
    return product
  }
}
