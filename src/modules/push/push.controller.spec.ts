import { Test, TestingModule } from "@nestjs/testing";
import { PushPublicController } from "./push-public.controller";

describe("Push Controller", () => {
  let controller: PushPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PushPublicController],
    }).compile();

    controller = module.get<PushPublicController>(PushPublicController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
