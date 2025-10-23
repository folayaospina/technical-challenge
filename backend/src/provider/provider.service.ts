import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProviderService {

    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<any[]> {
        return this.prisma.provider.findMany();
    }

    async findOne(id: string): Promise<any> {
        return this.prisma.provider.findUnique({
            where: { id }
        });
    }

    async create(createProviderDto: any): Promise<any> {
        return this.prisma.provider.create({
            data: createProviderDto
        });
    }

    async update(id: string, updateProviderDto: any): Promise<any> {
        return this.prisma.provider.update({
            where: { id },
            data: updateProviderDto
        });
    }

    async remove(id: string): Promise<void> {
        await this.prisma.provider.delete({
            where: { id }
        });
    }
}
