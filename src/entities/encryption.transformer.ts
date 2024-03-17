import * as bcrypt from "bcrypt";
import { ValueTransformer } from "typeorm";
import { GLOBAL } from "../constants";

export const encryptionTransformer: ValueTransformer = {
  from(hash: string): string {
    return hash;
  },
  to(password: string): string {
    const hash = bcrypt.hashSync(password, GLOBAL.bcrypt.saltRounds);
    return hash;
  },
};
