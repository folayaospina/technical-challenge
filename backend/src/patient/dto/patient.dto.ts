import { IsString, IsUUID, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsUUID()
    provider_id: string;

    @IsUUID()
    status_id: string;
}

export class PatientDto {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsUUID()
    provider_id: string;

    @IsUUID()
    status_id: string;

    @IsDateString()
    created_at: Date;
}

export class UpdatePatientDto {
    @IsString()
    @IsNotEmpty()
    full_name?: string;

    @IsEmail()
    email?: string;

    @IsString()
    @IsNotEmpty()
    phone?: string;

    @IsUUID()
    provider_id?: string;

    @IsUUID()
    status_id?: string;
}