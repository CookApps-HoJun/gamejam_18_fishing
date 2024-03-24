import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  Req,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Observable, fromEvent, map } from 'rxjs';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(
    private readonly sseService: SseService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse()
  sse(@Req() { user }): Observable<any> {
    const { uid } = user;
    console.log(`SSE: ${uid}`);

    return fromEvent(this.eventEmitter, `sse`).pipe(
      map(({ type, data }: any) => {
        if (data?.uid === uid || data?.uid === 0) {
          return { type, data };
        }
      }),
    );
  }

  @Post('event')
  async receiveEvent(
    @Body() { type, data }: Record<string, any>,
  ): Promise<string> {
    console.log(`Event: ${type}`, data);

    this.eventEmitter.emit(`sse`, { type, data });
    return 'OK';
  }
}
