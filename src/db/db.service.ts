import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { EnvironmentsModel } from '@app/globals/environments/environments.model';
import { EnvironmentService } from '@app/globals/environments/environment.service';
import { Keys } from '@app/globals/environments/enums/keys';

export const dbService = [
  TypeOrmModule.forRootAsync({
    imports: [EnvironmentsModel],
    inject: [EnvironmentService],
    async useFactory(config: EnvironmentService) {
      return {
        timezone: 'Z',
        trace: true,
        logging: config.get(Keys.TYPEORM_LOGGING) === 'true',
        ssl: false,
        type: config.get(Keys.TYPEORM_CONNECTION),
        host: config.get(Keys.DATABASE_HOST),
        port: +config.get(Keys.DATABASE_PORT),
        username: config.get(Keys.DATABASE_USER),
        password: config.get(Keys.DATABASE_PASSWORD),
        database: config.get(Keys.DATABASE_NAME),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: config.get(Keys.TYPEORM_SYNCHRONIZE) === 'true',
        keepConnectionAlive: true,
      } as ConnectionOptions;
    },
  }),
];
