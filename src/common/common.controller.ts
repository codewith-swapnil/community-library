import { Controller, Get } from "@nestjs/common";
import { Public } from "src/decorator/public.decorator";

@Controller("common")
export class CommonController {
  @Public()
  @Get("app_version")
  async appVersion(): Promise<string[]> {
    return ["2.0.0", "2.0.1", "2.0.2"];
  }
}
