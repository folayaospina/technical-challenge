import { Injectable } from '@nestjs/common';
import { CreateStatusHistoryDto } from './dto/statushistory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusHistoryService {

    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateStatusHistoryDto) {
        return this.prisma.statusHistory.create({
            data: {
                patient_id: data.patient_id,
                status_id: data.status_id,
                changed_at: new Date(),
            },
        });
    }

    async findByPatient(patientId: string) {
        return this.prisma.statusHistory.findMany({
            where: {
                patient_id: patientId,
            },
            orderBy: {
                changed_at: 'desc',
            },
        });
    }

    async findAll() {
        return this.prisma.statusHistory.findMany({
            orderBy: {
                changed_at: 'desc',
            },
        });
    }
    async findByPatientId(patientId: string) {
        return this.prisma.statusHistory.findMany({
            where: { 
                patient_id: patientId 
            },
            orderBy: {
                changed_at: 'desc',
            },
        });
    }

}
