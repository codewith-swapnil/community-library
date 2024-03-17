import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "nestjs-config";
import * as path from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BooksModule } from "./book/book.module";
import { BorrowsModule } from "./borrow/borrow.module";
import { CommonModule } from "./common/common.module";
import { CommonService } from "./common/common.service";
import { JWT_MODULE_OPTIONS } from "./constants";
import { AllExceptionsFilter } from "./filters/all-exceptions-filter";
import { BadRequestExceptionFilter } from "./filters/bad-request-exception-filter";
import { RolesGuard } from "./guards/roles.guard";
import { UsersModule } from "./users/users.module";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule,
    ConfigModule.load(
      path.resolve(__dirname, "config", "**", "!(*.d).{ts,js}"),
      {
        path: path.resolve(process.cwd(), "env", !ENV ? ".env" : `.env.${ENV}`),
      }
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get("database"),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register(JWT_MODULE_OPTIONS),
    MulterModule,
    CommonModule,
    UsersModule,
    BooksModule,
    BorrowsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    CommonService,
  ],
  exports: [CommonService],
})
export class AppModule {}
