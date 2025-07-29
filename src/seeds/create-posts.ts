import { DataSource } from 'typeorm';
import { BlogPost } from '../typeorm/entities/BlogPost';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [BlogPost],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const postRepo = dataSource.getRepository(BlogPost);

  const posts = [
    {
      title: 'Post 1',
      content: 'Conteúdo do post 1',
      author: 'Victor',
      date: new Date(),
      category: 'Tech',
      meta_tag_title: 'SEO Title 1',
      meta_tag_description: 'SEO Desc 1',
      post_image: 'image1.jpg',
      post_background: 'bg1.jpg',
    },
    {
      title: 'Post 2',
      content: 'Conteúdo do post 2',
      author: 'Maria',
      date: new Date(),
      category: 'Design',
      meta_tag_title: 'SEO Title 2',
      meta_tag_description: 'SEO Desc 2',
      post_image: 'image2.jpg',
      post_background: 'bg2.jpg',
    },
    {
      title: 'Post 3',
      content: 'Conteúdo do post 3',
      author: 'João',
      date: new Date(),
      category: 'Business',
      meta_tag_title: 'SEO Title 3',
      meta_tag_description: 'SEO Desc 3',
      post_image: 'image3.jpg',
      post_background: 'bg3.jpg',
    },
  ];

  for (const post of posts) {
    const newPost = postRepo.create(post);
    await postRepo.save(newPost);
  }

  console.log('Posts criados com sucesso!');
  await dataSource.destroy();
}

seed().catch(console.error);
