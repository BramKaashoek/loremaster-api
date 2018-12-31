import { JsonController, Post, Body, BadRequestError } from "routing-controllers";
import User from "../users/entity";
import { jwt as jwtHandler } from "../jwt";

interface IAuth {
  email: string;
  password: string;
}

@JsonController()
export default class AuthController {
  @Post("/auth")
  async auth(@Body() { email, password }: IAuth) {
    console.log(`post auth ${email}`);
    const user = await User.findOne({ where: { email } });

    if (!user || !user.id) throw new BadRequestError("userNotFound.");

    if (!(await user.checkPassword(password))) throw new BadRequestError("wrongPassword");

    const jwt = jwtHandler.sign({ id: user.id });
    return { jwt, id: user.id };
  }
}
