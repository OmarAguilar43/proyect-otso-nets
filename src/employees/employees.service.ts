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

  findOne(id: string) {
  
    const found = this.employeeRepository.findOneBy({id})
    return found
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      id:id,
      ...updateEmployeeDto
  })
    if(!employeeToUpdate)throw new NotFoundException()
      this.employeeRepository.save(employeeToUpdate)
    return employeeToUpdate
  }

  async remove(id: string) {
    this.employeeRepository.findOneBy({id})
    await this.employeeRepository.delete(id)
    return {
      message:`el elemento ${id} a sido eliminado`
    }
    
     
  }
}
