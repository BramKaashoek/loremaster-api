import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { IsEmail, IsString } from "class-validator";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcrypt";

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
  @Exclude()
  password: string;

  async setPassword(plainPassword: string) {
    const hash = await bcrypt.hash(plainPassword, 10);
    this.password = hash;
  }

  async checkPassword(plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
