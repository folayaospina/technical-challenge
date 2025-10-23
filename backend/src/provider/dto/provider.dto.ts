import { IsString, IsUUID, IsDateString } from 'class-validator';

export class ProviderDto {
    @IsUUID()
    id: string;

    @IsString()
    full_name: string;

    @IsString()
    specialty: string;

    @IsDateString()
    created_at: Date;
}

export class CreateProviderDto {
    @IsString()
    full_name: string;

    @IsString()
    specialty: string;
}

export class UpdateProviderDto {
    @IsString()
    full_name?: string;

    @IsString()
    specialty?: string;
}