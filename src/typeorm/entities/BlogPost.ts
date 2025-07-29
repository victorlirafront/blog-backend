import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'post',
})
export class BlogPost {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  author: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ default: false })
  published: boolean;

  @Column({ nullable: true })
  tags: string;
}
