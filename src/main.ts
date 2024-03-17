import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import { AppModule } from "./app.module";
import * as express from "express";
import { AllExceptionsFilter } from "./filters/all-exceptions-filter";
import { join } from "path";
import * as dotenv from "dotenv";
import { ValidationPipe } from "@nestjs/common";
import { RequestContextMiddleware } from "./middleware";

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Community Library API Docs")
    .setDescription("The Community Library API description")
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);
  app.enableCors();
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  app.use(RequestContextMiddleware);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use("/public", express.static(join(__dirname, "..", "public")));
  await app.listen(process.env.APP_PORT || 3017, "0.0.0.0");
}
bootstrap();
