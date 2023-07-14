import { Module } from '@nestjs/common';
import { TransfersController } from './transfers.controller';

@Module({
  imports: [],
  controllers: [TransfersController],
  providers: [],
})
export class AppModule {}
