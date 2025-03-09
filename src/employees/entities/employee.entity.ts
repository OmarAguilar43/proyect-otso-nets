import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne} from "typeorm"
import { Location } from 'src/locations/entities/location.entity';
import { User } from "src/auth/entities/user.entity";
@Entity()
export class Employee {
        @PrimaryGeneratedColumn("uuid")
        employeeId:string;
        @Column("text")
        employeeName:string;
        @Column('text')
        EmployeeLastName:string;
        @Column("text")
        EmployeePhoneNumber:string;
        @Column('text',{
                unique:true
        })
        employeeEmail:string
        @Column({
                nullable:true,
                type:'text',
        })
        employeePhoto:string;

        @ManyToOne(()=>Location,(location)=>location.employees)
        @JoinColumn({
                name:"locationId"
        })
        location:Location

        @OneToOne((()=>User))
        @JoinColumn({
                name:'userId'
        })
        user:User
}       
