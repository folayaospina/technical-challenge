import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto, UpdateProviderDto } from './dto/provider.dto'

@Controller('provider')
export class ProviderController {
    constructor(private readonly providerService: ProviderService) {}

    @Get()
    findAll() {
        return this.providerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.providerService.findOne(id);
    }

    @Post()
    create(@Body() createProviderDto: CreateProviderDto) {
        return this.providerService.create(createProviderDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
        return this.providerService.update(id, updateProviderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.providerService.remove(id);
    }
}
