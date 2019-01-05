import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn
} from "typeorm";
import { IsEmail, IsString } from "class-validator";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";
import Campaign from "../campaigns/entity";

@Entity()
@Unique(["email"])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsEmail()
  @Column("text")
  email: string;

  @IsString()
  @Column("text")
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToMany(_ => Campaign)
  @JoinTable()
  campaigns: Campaign[];

  @OneToOne(_ => Campaign)
  @JoinColumn()
  activeCampaign: Campaign;

  async setPassword(plainPassword: string) {
    const hash = await bcrypt.hash(plainPassword, 10);
    this.password = hash;
  }

  async checkPassword(plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  async addCampaign(campaign: Campaign) {
    if (!this.campaigns.includes(campaign)) {
      this.campaigns = [...this.campaigns, campaign];
      this.activeCampaign = campaign;
    }
  }
}
