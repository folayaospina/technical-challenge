import { IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateStatusHistoryDto {
    @IsUUID()
    patient_id: string;

    @IsUUID()
    status_id: string;

    @IsOptional()
    @IsDateString()
    changed_at?: Date;
}

export class UpdateStatusHistoryDto {
    @IsOptional()
    @IsUUID()
    patient_id?: string;

    @IsOptional()
    @IsUUID()
    status_id?: string;

    @IsOptional()
    @IsDateString()
    changed_at?: Date;
}

export class StatusHistoryResponseDto {
    id: string;
    patient_id: string;
    status_id: string;
    changed_at: Date;
}