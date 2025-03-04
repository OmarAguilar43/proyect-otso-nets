import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { loadESLint } from 'eslint';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) 
    private productRepository:Repository<Product>
  ){

  }

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product 
  }

  findAll() {
    return this.productRepository.find({
      loadEagerRelations:true,
      relations:{
        provider:true
      }

    })
  }

  findOne(productId: string) {

    const product = this.productRepository.findOneBy({productId})

    if(!product)throw new NotFoundException()

    return product
    
  }

  findByProvider(provider: string){
   return this.productRepository.findBy(
    {
      provider:{
        providerId:provider
      }
    }
   )
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId:id,
      ...updateProductDto
  })
    if(!productToUpdate)throw new NotFoundException()
      this.productRepository.save(productToUpdate)
    return productToUpdate
  }

  async remove(productId: string) {
    this.productRepository.findOneBy({productId})
    await this.productRepository.delete(productId)
    return {
      message:`el elemento ${productId} a sido eliminado`
    }
    
  }
}
