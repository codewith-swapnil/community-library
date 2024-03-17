import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BooksService } from "./book.service";

@ApiTags("Books")
@Controller("books")
export class BooksController {
  constructor(public service: BooksService) {}

  /******* Books Controller: Method to get count of Books ******/
  @Post("add")
  async addBook(@Req() req, @Res() res) {
    try {
      const data = await this.service.addBook(req.body);
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

  /******* Books Controller: Method to get count of Books ******/
  @Get("all")
  async getAllBooks(@Req() req, @Res() res) {
    try {
      const data = await this.service.getAllBook(req.query);
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
