import { Global, Module } from '@nestjs/common';

import { DatabaseService } from './database.service';

/**
 * Módulo responsable de la conexión con PostgreSQL.
 *
 * Se declara como global para que cualquier módulo
 * pueda inyectar DatabaseService sin volver a importar
 * DatabaseModule.
 */
@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}