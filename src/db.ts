import { createConnection } from "typeorm";
import User from "./users/entity";

export default () =>
  createConnection({
    type: "postgres",
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:postgres_password@localhost:5432/postgres",
    entities: [User],
    logging: true,
    synchronize: true // wipes and recreates DB! remove for prod!
  }).then(_ => console.log("DB connected"));
