import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import { Location } from 'src/locations/entities/location.entity';
@Entity()
export class Employee {
        @PrimaryGeneratedColumn("uuid")
        id:string;
        @Column("text")
        name:string;
        @Column('text')
        lastName:string;
        @Column("text")
        phoneNumber:string;
        @Column('text')
        email:string
        @Column({
                nullable:true,
                type:'text',
        })
        photoUrl:string;

        @ManyToOne(()=>Location,(location)=>location.employees)
        @JoinColumn({
                name:"locationId"
        })
        location:Location
}       
