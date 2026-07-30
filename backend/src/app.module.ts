import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';

/**
 * Módulo principal de la aplicación.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TasksModule,
  ],
})
export class AppModule {}