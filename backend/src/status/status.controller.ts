import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Get()
    getStatus() {
        return this.statusService.findAll();
    }

    @Get(':id')
    getStatusById(id: string) {
        return this.statusService.findById(id);
    }
}
