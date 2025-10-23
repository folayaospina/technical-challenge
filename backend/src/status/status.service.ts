import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusService {
    constructor(private readonly prisma: PrismaService) {}

 

    async findAll() {
        return this.prisma.status.findMany();
    }

    async findById(id: string) {
        return this.prisma.status.findUnique({
            where: { id: id},
        });
    }

}
