import { Test, TestingModule } from '@nestjs/testing';
import { EventStoreController } from './event-store.controller';

describe('EventStore Controller', () => {
  let controller: EventStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventStoreController],
    }).compile();

    controller = module.get<EventStoreController>(EventStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
