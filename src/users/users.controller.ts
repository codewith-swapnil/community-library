import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/decorator/public.decorator";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(public service: UsersService) {}
  /******* users Controller: Method to create new user ******/
  @Public()
  @Post("add")
  async addUser(@Req() req, @Res() res) {
    try {
      const data = await this.service.addUser(req.body);
      if (data.responseCode == 200) {
        return res.status(HttpStatus.OK).json(data);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json(data);
      }
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  /******* users Controller: Method to login user ******/
  @Public()
  @Post("login")
  async login(@Req() req, @Res() res) {
    try {
      const data = await this.service.login(req.body);
      if (data.responseCode == 200) {
        return res.status(HttpStatus.OK).json(data);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json(data);
      }
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
