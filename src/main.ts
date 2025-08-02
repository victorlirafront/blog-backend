import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '../config/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const ENVIRONMENT = process.env.ENVIRONMENT || 'development';
    const { SERVER_URL } = config[ENVIRONMENT];

    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    const PORT = process.env.PORT || 3002;
    
    app.setGlobalPrefix('api');

    await app.listen(PORT);

    console.log(`Server is running on ${SERVER_URL(PORT)}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

bootstrap();
