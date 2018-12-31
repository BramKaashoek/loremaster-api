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
    user.campaigns = [...user.campaigns, campaign];
    await user.save();

    return campaign;
  }
}
