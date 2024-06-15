import { Controller, Get, Param, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CustomResponse } from 'src/utils/response';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get()
  async findAll(@Query() params){

    const data=await this.productsService.findAll(params)
    return new CustomResponse(200, {message:'Data fetched successfull', data:data})
  }

  @Get("/productId")
  async findProductById(@Query() params){
    const data=await this.productsService.getProductById(params.product_id)
    return new CustomResponse(200, {message:'Data fetched successfull', data:data})
  }

}
