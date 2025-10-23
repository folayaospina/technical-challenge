import { Test, TestingModule } from '@nestjs/testing';
import { StatusHistoryController } from './status-history.controller';

describe('StatusHistoryController', () => {
  let controller: StatusHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusHistoryController],
    }).compile();

    controller = module.get<StatusHistoryController>(StatusHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
