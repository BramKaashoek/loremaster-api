import { createConnection } from "typeorm";
import User from "../users/entity";
import Campaign from "../campaigns/entity";

export default () =>
  createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgres://postgres:postgres_password@localhost:5432/postgres",
    entities: [User, Campaign],
    logging: false,
    synchronize: true // wipes and recreates DB! remove for prod!
  }).then(connection => {
    {
      console.log("DB connected");
      return connection;
    }
  });
