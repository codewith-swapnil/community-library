import { JWT_MODULE_OPTIONS } from "../constants";
import { JwtModule } from "@nestjs/jwt";
import { CommonService } from "./common.service";
import { Module } from "@nestjs/common";
import { CommonController } from "./common.controller";

@Module({
  providers: [CommonService],
  imports: [JwtModule.register(JWT_MODULE_OPTIONS)],
  exports: [CommonService],
  controllers: [CommonController],
})
export class CommonModule {}
