import { JsonController, Post, Body, BadRequestError } from "routing-controllers";
import User from "../users/entity";
import { jwt } from "../jwt";

interface IAuth {
  email: string;
  password: string;
}

@JsonController()
export default class AuthController {
  @Post("/auth")
  async auth(@Body() { email, password }: IAuth) {
    const user = await User.findOne({ where: { email } });

    if (!user || !user.id) throw new BadRequestError("User does not exist.");

    if (!(await user.checkPassword(password))) throw new BadRequestError("Incorrect password.");

    return jwt.sign({ id: user.id });
  }
}
