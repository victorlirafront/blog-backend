import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'posts',
})
export class BlogPost {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  author: string;

  @Column()
  date: Date;

  @Column()
  category: string;

  @Column()
  meta_tag_title: string;

  @Column()
  meta_tag_description: string;

  @Column()
  post_image: string;

  @Column()
  post_background: string;

  @Column()
  keywords: string;
}
