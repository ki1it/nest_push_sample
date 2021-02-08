import { Controller, Post, Body } from "@nestjs/common";

import { PushService } from "./push.service";
import { PushSubscribeDto, PushMsgDto } from "./dto/push-subscribe.dto";
import { PushTopic } from "./push.constants";

@Controller("")
export class PushPublicController {
  constructor(private readonly pushService: PushService) {}

  @Post("subscribe")
  async subscribe(@Body() pushSubscribeDto: PushSubscribeDto) {
    const { token } = pushSubscribeDto;

    const subscribeResult = await this.pushService.subscribe(token);

    return {
      data: subscribeResult,
    };
  }

  @Post("unsubscribe")
  async unsubscribe(@Body() pushSubscribeDto: PushSubscribeDto) {
    const { token } = pushSubscribeDto;

    const unsubscribeResult = await this.pushService.unsubscribe(token);

    return {
      data: unsubscribeResult,
    };
  }
  @Post("send")
  async send(@Body() PushMsgDto: PushMsgDto) {
    const { msg } = PushMsgDto;

    const result = await this.pushService.sendNotificationToTopic(
      PushTopic.news,
      { notification: { title: msg } }
    );

    return {
      data: result,
    };
  }
}
