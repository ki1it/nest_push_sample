import { Module } from "@nestjs/common";
import { Routes, RouterModule } from "nest-router";
import { PushPublicModule } from "./modules/push/push-public.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { LoggerModule } from "nestjs-pino";
import { join } from "path";

const routes: Routes = [
  {
    path: "/api/push",
    module: PushPublicModule,
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    LoggerModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    PushPublicModule,
  ],
})
export class AppModule {}
