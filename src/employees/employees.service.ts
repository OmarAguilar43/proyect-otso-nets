import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid'
import { NotFoundError } from 'rxjs';
import { Employee } from './entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) 
        private employeeRepository:Repository<Employee>
  ){

  }
  
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee
  }

  findAll() {
    //retornar todos
    return this.employeeRepository.find({
      loadEagerRelations:true,
      relations:{
        //Employee:true
      }

    })
  }

  findByLocation(id:number){
    const located = this.employeeRepository.findOneBy({
      location:{
        locationId:id
      }
    })
  }

  findOne(employeeId: string) {
  
    const found = this.employeeRepository.findOneBy({employeeId})
    return found
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId:id,
      ...updateEmployeeDto
  })
    if(!employeeToUpdate)throw new NotFoundException()
      this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate
  }

  async remove(employeeId: string) {
    this.employeeRepository.findOneBy({employeeId})
    await this.employeeRepository.delete(employeeId)
    return {
      message:`el elemento ${employeeId} a sido eliminado`
    }
    
     
  }
}
