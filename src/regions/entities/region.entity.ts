import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    reginId:number;
    @Column({
        type:'text',
        unique:true
    })
    regionName:string
    @Column('array')
    regionStates:string[]

}
