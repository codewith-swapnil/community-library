import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { GLOBAL } from "../constants";

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION,
});

@Injectable()
export class CommonService {
  constructor(private readonly jwtService: JwtService) {}

  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, GLOBAL.bcrypt.saltRounds);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  jwtSignup(payload: any) {
    return this.jwtService.sign(payload);
  }

  jwtVerify(token: string) {
    return this.jwtService.verify(token);
  }
}
