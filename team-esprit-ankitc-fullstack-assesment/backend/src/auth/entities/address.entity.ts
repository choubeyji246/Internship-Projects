import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './user.entity';

@Entity({name:"address"})
export class ShippingAddress{

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(()=>User)
    @JoinColumn( { name : "user_id"} )
    user_id:User

    @Column() 
    address:string
}