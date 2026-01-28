import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    // Enable API Versioning
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    app.setGlobalPrefix('api');

    // Swagger Configuration
    const config = new DocumentBuilder()
      .setTitle('Blog API')
      .setDescription('API for managing blog posts and sending emails')
      .setVersion('1.0')
      .addServer('/api/v1', 'Version 1')
      .addTag('health', 'API health check endpoints')
      .addTag('posts', 'Blog post management endpoints')
      .addTag('email', 'Email sending endpoints')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, '0.0.0.0');

    console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
    console.log(`📊 API endpoints available at http://0.0.0.0:${PORT}/api/v1`);
    console.log(
      `📚 Swagger documentation available at http://0.0.0.0:${PORT}/api/docs`,
    );
    console.log(`🌍 - Environment: ${process.env.NODE_ENV || 'development'}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

bootstrap();
