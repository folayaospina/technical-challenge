import { Test, TestingModule } from '@nestjs/testing';
import { StatusHistoryService } from './status-history.service';

describe('StatusHistoryService', () => {
  let service: StatusHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusHistoryService],
    }).compile();

    service = module.get<StatusHistoryService>(StatusHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
