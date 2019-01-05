import { JsonController, Post, Body, Authorized, HttpCode, CurrentUser } from "routing-controllers";
import Campaign from "./entity";
import User from "../users/entity";

@JsonController()
export default class CampaignController {
  @Authorized()
  @HttpCode(201)
  @Post("/campaigns")
  async createCampaign(@Body() data: Campaign, @CurrentUser() user: User) {
    console.log(`Post Campaign ${data.name}`);
    const entity = Campaign.create(data);
    const campaign = await entity.save();
    console.log(user);
    await user.addCampaign(campaign);
    console.log(user);
    await user.save();
    console.log("user saved");
    return campaign;
  }
}
