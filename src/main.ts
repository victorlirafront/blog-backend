import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.getHttpAdapter().getInstance().set('trust proxy', true);

    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('PORT') || 3001;

    app.setGlobalPrefix('api');
    await app.listen(PORT, '0.0.0.0');

    console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
    console.log(`📊 API endpoints available at http://0.0.0.0:${PORT}/api`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

bootstrap();
