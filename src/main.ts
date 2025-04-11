import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:{
      origin:"http://127.0.0.1:3000",
      credentials:true
    }
  });
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('API for otso proyect')
    .setVersion('0.9')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted:true,
    whitelist:true,
    transform:true

  }))
  console.log("🚀 NestJS backend iniciado en puerto 4000");

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
