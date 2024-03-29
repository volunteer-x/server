import { Controller, Get, UseGuards } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { PingNode, RMQService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class BroadcastController {
  constructor(
    private readonly broadcastService: BroadcastService,
    private readonly rmqService: RMQService,
  ) {}

  @EventPattern('broadcastPing')
  async handleBroadcastPing(
    @Payload() data: string,
    @Ctx() context: RmqContext,
  ) {
    const { id, users } = JSON.parse(data) as { id: string; users: string[] };

    this.broadcastService.broadcastPing(id, users);
    this.rmqService.ack(context);
  }

  @Get('test')
  async test() {
    const test = await this.broadcastService.test();

    return test;
  }
}
