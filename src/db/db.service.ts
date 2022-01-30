import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const dbService = [
  TypeOrmModule.forRootAsync({
    imports: [],
    inject: [],
    async useFactory(config: any) {
      return {
        timezone: 'Z',
        trace: true,
        logging: false,
        ssl: false,
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '12345',
        database: 'ferresmart',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
        keepConnectionAlive: true,
      } as ConnectionOptions;
    },
  }),
];
