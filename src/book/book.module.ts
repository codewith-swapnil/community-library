import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { CommonService } from "src/common/common.service";
import { JWT_MODULE_OPTIONS } from "src/constants";
import { BooksController } from "./book.controller";
import { Books } from "./book.entity";
import { BooksService } from "./book.service";

@Module({
  controllers: [BooksController],
  providers: [BooksService, CommonService],
  imports: [
    TypeOrmModule.forFeature([Books]),
    JwtModule.register(JWT_MODULE_OPTIONS),
    CommonModule,
  ],
  exports: [TypeOrmModule, BooksService],
})
export class BooksModule {}
