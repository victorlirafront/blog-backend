import { DataSource } from 'typeorm';
import { PostModel } from '../modules/posts/entities/post.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.BLOG_HOST || 'localhost',
  port: Number(process.env.BLOG_DB_PORT) || 3306,
  username: process.env.BLOG_USERNAME || 'root',
  password: process.env.BLOG_PASSWORD || '',
  database: process.env.BLOG_DATABASE || 'blog_db',
  entities: [PostModel],
  synchronize: true,
});

async function seed() {
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.BLOG_HOST?.includes('clever-cloud')
  ) {
    console.error('🚫 Seed command is disabled in production environment.');
    process.exit(1);
  }
  await dataSource.initialize();
  const postRepo = dataSource.getRepository(PostModel);

  const posts = [
    {
      title: 'Post 1',
      content: 'Conteúdo do post 1...',
      author: 'Victor',
      date: new Date(),
      category: 'Tech',
      meta_tag_title: 'SEO Title 1',
      meta_tag_description: 'SEO Desc 1',
      post_image: 'image1.jpg',
      post_background: 'bg1.jpg',
      keywords: 'javascript, java',
      slug: 'post-1',
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
      keywords: 'javascript, java',
      slug: 'post-2',
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
      keywords: 'javascript, java',
      slug: 'post-3',
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
