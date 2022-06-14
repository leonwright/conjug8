import { Test } from '@nestjs/testing';
import { ServerDictionaryService } from './server-dictionary.service';

describe('ServerDictionaryService', () => {
  let service: ServerDictionaryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerDictionaryService],
    }).compile();

    service = module.get(ServerDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
