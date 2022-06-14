import { Test } from '@nestjs/testing';
import { ServerDictionaryController } from './server-dictionary.controller';
import { ServerDictionaryService } from './server-dictionary.service';

describe('ServerDictionaryController', () => {
  let controller: ServerDictionaryController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerDictionaryService],
      controllers: [ServerDictionaryController],
    }).compile();

    controller = module.get(ServerDictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
