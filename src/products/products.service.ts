import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) 
    private productRepository:Repository<Product>
  ){

  }
  private products:CreateProductDto[]=[
    {
      productId:uuid(),
      productName:'Sabritas normal',
      price:23,
      countSeal:5,
      provider:uuid()
    },
    {
      productId:uuid(),
      productName:'Koka',
      price:28,
      countSeal:3,
      provider:uuid()
    },
    {
      productId:uuid(),
      productName:'Aguita gay',
      price:10,
      countSeal:9,
      provider:uuid()
    }
  ]
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product 
  }

  findAll() {
    return this.productRepository.find()
  }

  findOne(productId: string) {

    const product = this.productRepository.findOneBy({productId})

    if(!product)throw new NotFoundException()

    return product
    
  }

  findByProvider(provider: string){
    const found = this.products.filter((founded)=>founded.provider === provider)
    if(found.length === 0 ) throw new NotFoundException()
    return found
   
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
