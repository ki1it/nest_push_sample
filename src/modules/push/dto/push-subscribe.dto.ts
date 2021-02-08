import { IsDefined } from "class-validator";

export class PushSubscribeDto {
  @IsDefined()
  token: string;
}
export class PushMsgDto {
  @IsDefined()
  msg: string;
}
