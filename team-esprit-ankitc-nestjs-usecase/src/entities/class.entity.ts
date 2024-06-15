import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity()
export class Class {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

}
