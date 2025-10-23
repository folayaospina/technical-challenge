import { Module } from '@nestjs/common';
import { StatusHistoryController } from './status-history.controller';
import { StatusHistoryService } from './status-history.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StatusHistoryController],
  providers: [StatusHistoryService],
  exports: [StatusHistoryService],
})
export class StatusHistoryModule {}
/*  */