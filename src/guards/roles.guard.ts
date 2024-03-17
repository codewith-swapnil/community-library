import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { CommonService } from "src/common/common.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly common: CommonService,
    private readonly usersService: UsersService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler()
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const checkXApiKey = this.checkXApiKey(context);
    if (checkXApiKey) {
      const user = this.getPayload(context);
      if (user) {
        request.user = user;
      }
      return true;
    }
  }

  getPayload(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (typeof request.headers.authorization !== "undefined") {
      const authorization = request.headers.authorization.split(" ")[1];
      try {
        return this.common.jwtVerify(authorization);
      } catch (e) {
        throw new UnauthorizedException("Unauthorized Get Payload");
      }
    } else {
      throw new UnauthorizedException("Unauthorized authorization header");
    }
  }

  checkXApiKey(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (typeof request.headers["x-api-key"] !== "undefined") {
      const xapikey = request.headers["x-api-key"];
      try {
        if (xapikey == process.env.WEB_API_KEY) {
          return true;
        } else {
          throw new UnauthorizedException("X-API-KEY Not Match");
        }
      } catch (e) {
        throw new UnauthorizedException("Unauthorized Get Payload");
      }
    } else {
      throw new UnauthorizedException("Need X-API-KEY");
    }
  }
}
