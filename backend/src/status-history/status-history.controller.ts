import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StatusHistoryService } from './status-history.service';
import { CreateStatusHistoryDto, UpdateStatusHistoryDto } from './dto/statushistory.dto';

@Controller('status-history')
export class StatusHistoryController {
    constructor(private readonly statusHistoryService: StatusHistoryService) {}

    @Get()
    async findAll() {
        return this.statusHistoryService.findAll();
    }

    @Get(':id')
    async findMany(@Param('id') id: string) {
        return this.statusHistoryService.findByPatientId(id);
    }

    @Post()
    async create(@Body() createStatusHistoryDto: CreateStatusHistoryDto) {
        return this.statusHistoryService.create(createStatusHistoryDto);
    }


}
