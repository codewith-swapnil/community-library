import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CommonService } from "src/common/common.service";
import { Repository } from "typeorm";
import { Books } from "./book.entity";

@Injectable()
export class BooksService extends TypeOrmCrudService<Books> {
  private repository: Repository<Books> = null;
  constructor(
    @InjectRepository(Books)
    BooksRepository: Repository<Books>,
    private readonly commonService: CommonService
  ) {
    super(BooksRepository);
    this.repository = BooksRepository;
  }

  /******* Book Controller: Method to create new Book ******/
  async addBook(book: any): Promise<any> {
    const response = {
      responseCode: 400,
      flash: false,
      message: "Invalid request",
      book: null,
    };
    try {
      response.book = await this.repository.save(book);
      response.flash = true;
      response.message = "Added New Book";
      response.responseCode = 200;
    } catch (error) {}
    return response;
  }

  /******* Book Controller: Method to get All Book ******/
  async getAllBook(data: any): Promise<any> {
    const response = {
      responseCode: 400,
      flash: false,
      message: "Invalid request",
      count: 0,
      book: null,
    };
    try {
      const skip = data.skip;
      const take = data.take;
      const [books, count] = await this.repository.findAndCount({
        where: { isDeleted: false },
        skip: skip,
        take: take,
      });
      response.count = count;
      response.book = books;
      response.flash = true;
      response.message = "Added New Book";
      response.responseCode = 200;
    } catch (error) {}
    return response;
  }
}
