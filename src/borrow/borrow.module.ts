import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { CommonService } from "src/common/common.service";
import { JWT_MODULE_OPTIONS } from "src/constants";
import { BorrowsController } from "./borrow.controller";
import { Borrows } from "./borrow.entity";
import { BorrowsService } from "./borrow.service";

@Module({
  controllers: [BorrowsController],
  providers: [BorrowsService, CommonService],
  imports: [
    TypeOrmModule.forFeature([Borrows]),
    JwtModule.register(JWT_MODULE_OPTIONS),
    CommonModule,
  ],
  exports: [TypeOrmModule, BorrowsService],
})
export class BorrowsModule {}
