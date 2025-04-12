import { Test, TestingModule } from '@nestjs/testing';
import { CarbondetailsService } from './carbondetails.service';

describe('CarbondetailsService', () => {
  let service: CarbondetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarbondetailsService],
    }).compile();

    service = module.get<CarbondetailsService>(CarbondetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
