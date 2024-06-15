import { Entity, PrimaryColumn, Column} from 'typeorm';

@Entity()
export class Exam {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

}
