import { Module } from '@nestjs/common';
import { EnvironmentService } from '@app/globals/environments/environment.service';

@Module({
  providers: [
    {
      provide: EnvironmentService,
      useClass: EnvironmentService,
    },
  ],
  exports: [EnvironmentService],
})
export class EnvironmentsModel {}
