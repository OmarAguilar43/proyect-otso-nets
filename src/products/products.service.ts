import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid'

@Injectable()
export class ProductsService {
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
    if(!createProductDto.productId)createProductDto.productId = uuid()
    createProductDto.productId = uuid()

    this.products.push(createProductDto)
    return createProductDto
  }

  findAll() {
    return this.products
  }

  findOne(id: string) {
    const founded = this.products.filter((founded)=>founded.productId === id)[0]
    return founded
    
  }

  findByProvider(provider: string){
    const found = this.products.filter((founded)=>founded.provider === provider)
    if(found.length === 0 ) throw new NotFoundException()
    return found
   
  }

  update(productId: string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(productId)
    productToUpdate = {
      ...productToUpdate,
      ...updateProductDto
    }

    this.products=this.products.map((product)=>{
      if(product.productId === productId){
          product = productToUpdate
      }
      return product
    })
    return productToUpdate
  }

  remove(productId: string) {
    this.findOne(productId)
    const founded = this.products.filter((founded)=>founded.productId !== productId)[0]
    
    return founded
    
  }
}
