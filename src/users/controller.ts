import { JsonController, Post, Get, Param, Body, BadRequestError, HttpCode, Authorized } from "routing-controllers";
import User from "./entity";

@JsonController()
export default class UserController {
  @HttpCode(201)
  @Post("/users")
  async createUser(@Body() data: User) {
    console.log(`Post Users ${data.email}`);
    const { password, ...rest } = data;
    if (await User.findOne({ where: { email: data.email } })) throw new BadRequestError("emailInUse");

    const entity = User.create(rest);
    await entity.setPassword(password);
    return await entity.save();
  }

  @Get("/users/:id")
  @Authorized()
  getUser(
    @Param("id")
    id: string
  ) {
    return User.findOne({ where: { id } });
  }
}
