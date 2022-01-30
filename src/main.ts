import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger: Logger = new Logger('FerreSmart Cloud');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(process.env.PORT);
  logger.log(
    `Micro Servicio: ${process.env.MICROSERVICIO}::${process.env.HOST}:${process.env.PORT}`,
  );
}
bootstrap();
