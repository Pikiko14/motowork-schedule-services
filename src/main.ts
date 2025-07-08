import { envs } from './config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  // cors enable
  const corsOptions: CorsOptions = {
    origin: [
      "http://localhost:9000",
      "http://localhost:9001",
      "http://localhost:9200",
      "https://app.motowork.xyz",
      "http://testbanner.test",
      "http://admin.motowork.xyz/",
      "https://admin.motowork.xyz",
      "http://app.motowork.xyz",
      "https://app.motowork.xyz",
      "https://motowork.xyz",
      "http://motowork.xyz",
      'http://motowork.co',
      'https://motowork.co',
      "http://admin.motowork.co",
      "https://admin.motowork.co",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(envs.port || 3083);
  logger.log(`Schedule Services Microservice running on port ${ envs.port }`);
}
bootstrap();
