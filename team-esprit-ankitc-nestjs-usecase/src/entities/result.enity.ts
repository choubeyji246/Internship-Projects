import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column} from 'typeorm';
import { User } from './user.entity';
import { Exam } from './exam.entity';
import { Class } from './class.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  Math: number

  @Column({nullable:true})
  Science: number

  @Column({nullable:true})
  English: number

  @Column({nullable:true})
  ComputerScience: number

  @ManyToOne(() => User)
  @JoinColumn({name: 'student_id'})
  student_id: User;

  @ManyToOne(() => Exam)
  @JoinColumn({name: 'exam_id'})
  exam_id: Exam;

  @ManyToOne(() => Class)
  @JoinColumn({name: 'class_id'})
  class_id: Exam;

}
