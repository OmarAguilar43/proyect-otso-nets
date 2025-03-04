import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository,Like } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository:Repository<Provider>
  ){}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto)
  }

  findAll() {
    return this.providerRepository.find()
  }

  findOne(id: string) {
    return this.providerRepository.findOneBy({providerId:id})
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providerToUpdate = await this.providerRepository.preload({
      providerId:id,
      ...updateProviderDto
    })
    if (!providerToUpdate) throw new NotFoundException()
    
    return this.providerRepository.save(providerToUpdate)
    
    
  }

  async findByName(name:string){
    const found = await this.providerRepository.findBy(
      {
     providerName:Like(`%${name}%`)
      }
    )
    if(!found)throw new NotFoundException()
    return found
  }

  remove(id: string) {
  return this.providerRepository.delete({providerId:id})
  }
}
