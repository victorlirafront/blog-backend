import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    const PORT = process.env.PORT || 3002;
    
    app.setGlobalPrefix('api');

    await app.listen(PORT);

    console.log(`Server is running on ${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

bootstrap();
