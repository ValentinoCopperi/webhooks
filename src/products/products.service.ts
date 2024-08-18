import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create.product';
import { UpdateProductDto } from './dto/update.product';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel : Model<Product>
    ){}

    async findAll() : Promise<Product[]> {
        return this.productModel.find().lean();
    }

    async findOne(id:string) : Promise<Product>{
        return this.productModel.findById({_id : id}).lean()
    }

    async create(createProductDto : CreateProductDto) : Promise<Product>{
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async update(
        id:string,
        updateProductDto : UpdateProductDto
    ) : Promise<Product>{
        return this.productModel.updateOne({_id:id}, updateProductDto).lean();
    }

    async remove (id:string) : Promise<Product>{
        return this.productModel.deleteOne({_id:id}).lean();
    }
}
