import { JwtModuleOptions } from "@nestjs/jwt";

export const GLOBAL = {
  JWT: {
    secret: "x5kZivtV3arfTcxVKy4wRxJemLP2Ik1vL8PEShIJoKYeQIEcpWl5zmFo0AZZWWz",
  },
  bcrypt: {
    saltRounds: 10,
  },
};
export const JWT_MODULE_OPTIONS: JwtModuleOptions = {
  secret: GLOBAL.JWT.secret,
  signOptions: {
    expiresIn: "14d",
  },
};
