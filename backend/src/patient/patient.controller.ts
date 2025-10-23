import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Get()
    async findAll() {
        return this.patientService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.patientService.findById(id);
    }

    @Post()
    async create(@Body() createPatientDto: CreatePatientDto) {
        return this.patientService.create(createPatientDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
        return this.patientService.update(id, updatePatientDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.patientService.delete(id);
    }
}
