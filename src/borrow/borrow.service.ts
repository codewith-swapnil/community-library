import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CommonService } from "src/common/common.service";
import { ILike, Repository, getRepository } from "typeorm";
import { Borrows } from "./borrow.entity";

@Injectable()
export class BorrowsService extends TypeOrmCrudService<Borrows> {
  private repository: Repository<Borrows> = null;

  constructor(
    @InjectRepository(Borrows) BorrowsRepository: Repository<Borrows>,
    private readonly commonService: CommonService
  ) {
    super(BorrowsRepository);
    this.repository = BorrowsRepository;
    this.commonService = commonService;
  }

  /******* Borrows Controller: Method to add Borrows ******/
  async addBorrow(params: any): Promise<any> {
    const response = {
      flash: false,
      message: "Invalid request",
      responseCode: 400,
      borrows: null,
    };
    try {
      (params.borrowDateTime = new Date().toISOString()),
        (params.status = "borrow");
      response.borrows = await this.repository.save(params);
      response.flash = true;
      response.message = "Added New Borrows......";
      response.responseCode = 200;
    } catch (error) {
      console.log(error);
    }
    return response;
  }

  /******* Borrows Controller: Method to return Borrows ******/
  async returnBorrow(params: any): Promise<any> {
    const response = {
      flash: false,
      message: "Invalid request",
      responseCode: 400,
      borrows: null,
    };
    try {
      const borrow = await this.repository.findOne({
        where: {
          userId: params.userId,
          bookId: params.bookId,
          status: "borrow",
        },
      });

      await this.repository.update(
        { id: borrow.id },
        { returnDateTime: new Date().toISOString(), status: "return" }
      );

      response.borrows = await this.repository.findOne({
        where: { id: borrow.id },
      });
      response.flash = true;
      response.message = "Book Return succesfully......";
      response.responseCode = 200;
    } catch (error) {
      console.log(error);
    }
    return response;
  }

  /******* Borrows services:Method to list borrows ******/
  async listMemberBorrows(userId: any): Promise<any> {
    const response = {
      flash: false,
      message: "Invalid request",
      responseCode: 400,
      count: 0,
      data: null,
    };
    try {
      const [BorrowsBooks, count] = await getRepository(Borrows)
        .createQueryBuilder("borrows")
        .leftJoinAndSelect("borrows.user", "users")
        .leftJoinAndSelect("borrows.book", "books")
        .where("borrows.userId = :userId", {
          userId: userId,
        })
        .getManyAndCount();

      (response.responseCode = 200),
        (response.flash = true),
        (response.count = count),
        (response.data = BorrowsBooks),
        (response.message = "Borrows List...");
    } catch (error) {
      console.log(error);
    }
    return response;
  }

  /******* Borrows services:Method to list borrows ******/
  async listBorrows(): Promise<any> {
    const response = {
      flash: false,
      message: "Invalid request",
      responseCode: 400,
      count: 0,
      data: null,
    };
    try {
      const [BorrowsBooks, count] = await getRepository(Borrows)
        .createQueryBuilder("borrows")
        .leftJoinAndSelect("borrows.user", "users")
        .leftJoinAndSelect("borrows.book", "books")
        .getManyAndCount();

      (response.responseCode = 200),
        (response.flash = true),
        (response.count = count),
        (response.data = BorrowsBooks),
        (response.message = "Borrows List...");
    } catch (error) {
      console.log(error);
    }
    return response;
  }

  /******* Borrows services:   Method to get single club details ******/
  async listMultipleBorrowsBook(): Promise<any> {
    const response = {
      responseCode: 400,
      flash: false,
      message: "Invalid request",
      books: null,
    };
    try {
      let books = await getRepository(Borrows)
        .createQueryBuilder("borrows")
        .select("borrows.bookId", "bookId")
        .addSelect("COUNT(DISTINCT borrows.userId)", "userCount")
        .groupBy("borrows.bookId")
        .having("COUNT(DISTINCT borrows.userId) > 1")
        .getRawMany();

      (response.responseCode = 200),
        (response.flash = true),
        (response.books = books),
        (response.message = "Borrows List...");
    } catch (error) {
      console.log(error);
    }
    return response;
  }
}