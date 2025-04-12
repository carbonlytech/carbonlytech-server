import { Test, TestingModule } from '@nestjs/testing';
import { CarbondetailsController } from './carbondetails.controller';

describe('CarbondetailsController', () => {
  let controller: CarbondetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarbondetailsController],
    }).compile();

    controller = module.get<CarbondetailsController>(CarbondetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
