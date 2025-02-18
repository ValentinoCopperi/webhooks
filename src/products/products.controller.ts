import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create.product';
import { UpdateProductDto } from './dto/update.product';
import { Product } from './schemas/products.schemas';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() : Promise <Product[]>{
    return this.productsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id:string) : Promise <Product>{
    return this.productsService.findOne(id);
  }

  @Post()
  crete(@Body()createProductDto : CreateProductDto) : Promise<Product>{
    return this.productsService.create(createProductDto);
  }

  @Put(":id")
  update(
    @Param("id") id :string,
    @Body() updateProductDto : UpdateProductDto
  ) : Promise<Product>{
    return this.productsService.update(id,updateProductDto);
  }

  @Delete(":id")
  delete(@Param("id") id : string) : Promise <Product>{
    return this.productsService.remove(id);
  }

}
