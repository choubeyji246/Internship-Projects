import { User } from "src/auth/entities/user.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity,  PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


class items{
    product_id:string
}

@Entity({name: 'orders' })
export class Order {

    @PrimaryColumn()
    order_id:string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    date:Date;

    @Column()
    items:string

    @Column()
    user_id:string

    @Column()
    quantities:number

    @Column()
    total_amount:number

    @Column()
    status:string

    @Column()
    shippingAddress:string
}
