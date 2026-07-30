import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';

/**
 * Servicio responsable de administrar la conexión
 * con PostgreSQL mediante un Pool de conexiones.
 */
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  /**
   * Pool de conexiones reutilizable.
   */
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_NAME'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
    });
  }

  /**
   * Verifica la conexión al iniciar la aplicación.
   */
  async onModuleInit(): Promise<void> {
    await this.pool.query('SELECT 1');

    console.log('PostgreSQL connection established.');
  }

  /**
   * Cierra el pool cuando la aplicación finaliza.
   */
  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }

  /**
   * Ejecuta una consulta SQL parametrizada.
   *
   * @param text Consulta SQL.
   * @param params Parámetros de la consulta.
   */
  async query<T>(
    text: string,
    params: unknown[] = [],
  ): Promise<QueryResult<T>> {
    return this.pool.query(text, params);
  }
}