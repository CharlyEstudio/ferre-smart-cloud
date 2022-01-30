import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { config } from 'dotenv';

@Injectable()
export class EnvironmentService {
  private log: Logger = new Logger(EnvironmentService.name);

  constructor() {
    if (!('MICROSERVICIO' in process.env)) {
      const envFilePath = `${__dirname}/../...env`;
      const existPath = fs.existsSync(envFilePath);

      if (!existPath) {
        this.log.error('El archivo .env no existe');
        process.exit(0);
      }

      this.log.debug('Environment Cargado');
      config({ path: envFilePath });
    }
  }

  get(key: string): string {
    return process.env[key];
  }
}
