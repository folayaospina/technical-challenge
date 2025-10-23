import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePatientDto): Promise<Patient> {
        return this.prisma.patient.create({
            data,
            include: {
                provider: true,
                status: true,
            },
        });
    }

    async findAll(): Promise<Patient[]> {
        return this.prisma.patient.findMany({
            include: {
                provider: true,
                status: true,
            },
        });
    }

    async findById(id: string): Promise<Patient | null> {
        return this.prisma.patient.findUnique({
            where: { id },
            include: {
                provider: true,
                status: true,
                status_history: {
                    include: {
                        status: true,
                    },
                    orderBy: {
                        changed_at: 'desc',
                    },
                },
            },
        });
    }

    async update(id: string, data: UpdatePatientDto): Promise<Patient> {
        return this.prisma.patient.update({
            where: { id },
            data,
            include: {
                provider: true,
                status: true,
            },
        });
    }

    async delete(id: string): Promise<Patient> {
        return this.prisma.patient.delete({
            where: { id },
        });
    }
}
