import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessEvent } from './guards/access.guard';
import { IRequestEvent } from './interfaces/request.interface';
import { EventStoreService } from './event-store.service';
import { GetEventDto } from './dto/get.dto';
import { ProjectionDto } from './dto/projection.dto';

@ApiTags('Events')
@UseGuards(AccessEvent)
@Controller('events')
export class EventStoreController {
  public constructor(private readonly eventStoreService: EventStoreService) {}

  @Get()
  @ApiOkResponse({ type: [GetEventDto] })
  public List() {
    return this.eventStoreService.List();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: GetEventDto })
  public GetUser(@Req() req: IRequestEvent) {
    return this.eventStoreService.Get(req.event);
  }

  @Post('make-projection')
  @ApiBody({ type: ProjectionDto })
  public MakeProjection(@Body() data: ProjectionDto) {
    return this.eventStoreService.MakeProjection(data.upTo);
  }
}
