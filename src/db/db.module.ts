import { Module } from '@nestjs/common';
import { dbService } from '@app/db/db.service';

@Module({
  imports: [...dbService],
  exports: [...dbService],
})
export class DbModule {}
