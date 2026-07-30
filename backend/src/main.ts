import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  /*
   * Crea la instancia principal de la aplicación NestJS.
   */
  const app = await NestFactory.create(AppModule);

  /*
   * Obtiene el servicio de configuración para acceder
   * a las variables definidas en el archivo .env.
   */
  const configService = app.get(ConfigService);

  /*
   * Habilita CORS para permitir que el frontend
   * pueda consumir la API.
   */
  app.enableCors();

  /*
   * Define un prefijo global para todos los endpoints.
   *
   * Ejemplo:
   * GET /tasks
   *
   * pasa a ser
   *
   * GET /api/tasks
   */
  app.setGlobalPrefix('api');

  /*
   * Configura la validación global.
   *
   * whitelist:
   * Elimina propiedades que no existan en los DTOs.
   *
   * forbidNonWhitelisted:
   * Genera un error cuando llegan propiedades no permitidas.
   *
   * transform:
   * Convierte automáticamente los datos recibidos al tipo esperado.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /*
   * Obtiene el puerto desde las variables de entorno.
   * Si no existe, utiliza el puerto 3000.
   */
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);

  console.log(`Application running on http://localhost:${port}/api`);
}

bootstrap();