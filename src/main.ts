import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  });

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    session({
      store: redisStore,
      secret: 'your-secret-key', // Replace with a secure secret
      resave: false, // Prevents resaving unchanged sessions
      saveUninitialized: false, // Don't save uninitialized sessions
      cookie: {
        secure: false, // Set to true in production with HTTPS
        maxAge: 300000, // 30 minutes
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Reading Plan API')
    .setDescription('API documentation for the Reading Plan application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
