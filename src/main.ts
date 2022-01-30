import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger: Logger = new Logger('FerreSmart Cloud');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug'],
  });

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('FerreSmart Cloud')
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .addTag('user')
    .addTag('oauth')
    .addTag('health')
    .setContact('FerreSmart', 'https://ferresmart.com', 'hola@ferresmart.com')
    .setTermsOfService('Terminos del Servicio')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  logger.debug(
    `Micro Servicio: ${process.env.MICROSERVICIO}::${process.env.HOST}:${process.env.PORT}`,
  );
}
bootstrap();
