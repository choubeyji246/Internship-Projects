import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'products' })
export class Product {
    @PrimaryColumn()
    product_id: string;

    @Column()
    product_name:string

    @Column()
    product_model:string

    @Column()
    avaibility:number

    @Column()
    rating:number

    @Column()
    type:string;

    @Column()
    price:number

    @Column()
    description:string
    
}