import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({
    type:'enum',
    enum:['STUDENT','TEACHER']
})
  role: String
}
