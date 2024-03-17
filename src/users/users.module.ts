import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "nestjs-config";
import { CommonModule } from "src/common/common.module";
import { CommonService } from "src/common/common.service";
import { JWT_MODULE_OPTIONS } from "src/constants";
import { UsersController } from "./users.controller";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, CommonService],
  imports: [
    BullModule.registerQueueAsync({
      name: "users-queue",
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get("queue"),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register(JWT_MODULE_OPTIONS),
    CommonModule,
  ],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
