import {Entity,Column,PrimaryGeneratedColumn} from "typeorm"
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
}       
