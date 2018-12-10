import { JsonController, Post, Get, Param, Body, BadRequestError } from "routing-controllers";
import User from "./entity";

@JsonController()
export default class UserController {
  @Post("/users")
  async signUp(@Body() data: User) {
    console.log("post");
    const { password, ...rest } = data;
    if (await User.findOne({ where: { email: data.email } })) throw new BadRequestError("email already in use");

    const entity = User.create(rest);
    await entity.setPassword(password);
    return await entity.save();
  }

  @Get("/users/:id")
  getUser(
    @Param("id")
    id: string
  ) {
    return User.findOne({ where: { id } });
  }
}
