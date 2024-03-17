import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Queue } from "bull";
import { CommonService } from "src/common/common.service";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "./users.entity";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  private repository: Repository<User> = null;
  constructor(
    @InjectRepository(User) usersRepository: Repository<User>,
    private readonly commonService: CommonService,
    @InjectQueue("users-queue") private readonly usersQueue: Queue //private http: HttpService,
  ) {
    super(usersRepository);
    this.repository = usersRepository;
  }

  async createAccessToken(user: User, uuid?: any): Promise<any> {
    let uuid_new;
    if (!uuid) {
      uuid_new = uuidv4();

      const sessions = {
        userId: user.id,
        UUID: uuid_new,
        active: true,
      };
      const entity = Object.assign(new User(), sessions);
    } else {
      uuid_new = uuid;
    }
    const payload = {
      id: user.id,
      uuid: uuid_new,
      timestamp: Date.now().toString(),
    };
    const jtoken = this.commonService.jwtSignup(payload);
    return jtoken;
  }

  /******* users Controller: Method to create new user ******/
  async addUser(user: any): Promise<any> {
    const response = {
      user: null,
      flash: false,
      message: "Invalid request",
      responseCode: 400,
    };
    try {
      const findUser1 = await this.repo.findOne({
        where: { email: user.email },
      });

      if (findUser1) {
        response.message =
          "Email already registered. Please try with a different email address.";
        response.responseCode = 300;
        return response;
      }

      const hashPassward = await this.commonService.getHash(user.password);
      user.password = hashPassward;

      response.user = await this.repository.save(user);
      delete response.user.password;

      const accessToken = await this.createAccessToken(response.user);
      response.user.accessToken = accessToken;

      response.flash = true;
      response.message = "Added New User";
      response.responseCode = 200;
    } catch (error) {}
    return response;
  }

  /******* users Controller: Method to login user ******/
  async login(user: any): Promise<any> {
    const response = {
      user: null,
      flash: false,
      message: "Invalid request",
      responseCode: 400,
    };
    try {
      let findUser: User;
      findUser = await this.repo.findOne({
        where: { email: user.email },
      });

      if (!findUser) {
        if (user.email) {
          response.message = "Please enter registered email.";
          response.responseCode = 300;
          return response;
        }
      }

      if (findUser.isActive == false) {
        response.message =
          "The user is deactivated. Please connect with the admin.";
        response.responseCode = 300;
        return response;
      }

      const status = await this.commonService.compareHash(
        user.password,
        findUser.password
      );
      if (status) {
        response.user = findUser;
        delete response.user.password;
        delete response.user.otp;

        const accessToken = await this.createAccessToken(response.user);
        response.user.accessToken = accessToken;
        response.flash = true;
        response.message = "User Login Succesfully...";
        response.responseCode = 200;
      } else {
        response.flash = false;
        response.message = "Incorrect Email or Password";
        response.responseCode = 300;
      }
    } catch (error) {}
    return response;
  }
}
