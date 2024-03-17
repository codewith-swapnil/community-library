import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const customResponse: any = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: null,
      //errorCode: null,
    };

    const responseStatus = exception.status ? exception.status : exception.name;
    console.log("exception", exception);
    switch (responseStatus) {
      case "QueryFailedError":
        customResponse.message = exception.detail;
        if (exception.code === "23505") {
          customResponse.errorCode = exception.code;
          customResponse.erroredField = customResponse.message.substring(
            customResponse.message.indexOf("(") + 2,
            customResponse.message.indexOf(")=") - 1
          );
        }
        break;
      case 400:
        if (exception.name == "BadRequestException") {
          customResponse.message = exception.response.message;
        } else {
          customResponse.message = "Invalid credentials";
        }
        break;
      case 401:
        customResponse.message = "Invalid credentials";
        break;
      case 403:
        customResponse.message = exception.message;
        break;
      case 404:
        customResponse.message = "Not Found";
        break;
      case 413: // large file
        customResponse.message = exception.message;
        break;
      case 415: // UnsupportedMediaTypeException
        customResponse.message = exception.message;
        break;
    }
    // sending error response with message
    response.status(status).json(customResponse);
  }
}
