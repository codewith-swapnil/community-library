import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Borrows } from "./borrow.entity";
import { BorrowsService } from "./borrow.service";
import { Public } from "src/decorator/public.decorator";

@ApiTags("Borrows")
@Controller("borrows")
export class BorrowsController {
  constructor(public service: BorrowsService) {}

  /******* Borrows Controller: Method to add Borrows ******/
  @Post("add")
  async addBorrow(@Req() req, @Res() res) {
    try {
      const data = await this.service.addBorrow(req.body);
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

  /******* Borrows Controller: Method to add Borrows ******/
  @Post("return")
  async returnBorrow(@Req() req, @Res() res) {
    try {
      const data = await this.service.returnBorrow(req.body);
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

  /******* Borrows Controller: Method to list borrows ******/
  @ApiBody({ type: Borrows })
  @Get("member/:id")
  async listMemberBorrows(@Req() req, @Res() res) {
    try {
      const data = await this.service.listMemberBorrows(req.params.id);
      if (data.responseCode == 200) {
        return res.status(HttpStatus.OK).json(data);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json(data);
      }
    } catch (error) {
      console.log("UsersController -> verify -> error", error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  /******* Borrows Controller: Method to list borrows ******/
  @ApiBody({ type: Borrows })
  @Get("get")
  async listBorrows(@Req() req, @Res() res) {
    try {
      const data = await this.service.listBorrows();
      if (data.responseCode == 200) {
        return res.status(HttpStatus.OK).json(data);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json(data);
      }
    } catch (error) {
      console.log("UsersController -> verify -> error", error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  /******* Borrows Controller: Method to list borrows ******/
  @ApiBody({ type: Borrows })
  @Get("multiple/book")
  async listMultipleBorrowsBook(@Req() req, @Res() res) {
    try {
      const data = await this.service.listMultipleBorrowsBook();
      if (data.responseCode == 200) {
        return res.status(HttpStatus.OK).json(data);
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json(data);
      }
    } catch (error) {
      console.log("UsersController -> verify -> error", error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
