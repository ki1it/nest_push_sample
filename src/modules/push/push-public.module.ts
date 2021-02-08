import { Module } from "@nestjs/common";

import { PushService } from "./push.service";
import { PushPublicController } from "./push-public.controller";

@Module({
  providers: [PushService],
  controllers: [PushPublicController],
  exports: [PushService],
})
export class PushPublicModule {}
