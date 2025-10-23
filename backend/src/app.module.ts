import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { PatientModule } from './patient/patient.module';
import { ProviderModule } from './provider/provider.module';
import { StatusModule } from './status/status.module';
import { StatusHistoryModule } from './status-history/status-history.module';

@Module({
  imports: [
    PrismaModule,
    PatientModule,
    ProviderModule,
    StatusModule,
    StatusHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
