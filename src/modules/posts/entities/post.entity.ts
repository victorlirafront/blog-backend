import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_tag_title: string;

  @Column({ type: 'text', nullable: true })
  meta_tag_description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  post_image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  post_background: string;

  @Column({ type: 'text', nullable: true })
  keywords: string;

  @UpdateDateColumn()
  updated_at: Date;
}
