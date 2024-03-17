import { OnGlobalQueueError, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { SesService } from "@nextnm/nestjs-ses";
import { UsersService } from "./users.service";

@Processor("users-queue")
export class QueueProcessor {
  constructor(
    private readonly userService: UsersService,
    private readonly sesService: SesService
  ) {}
  private readonly logger = new Logger(QueueProcessor.name);

  @OnGlobalQueueError()
  async OnGlobalQueueError(jobId: number) {
    this.logger.error(`Queue error ${jobId}`);
  }
}
