import * as Koa from "koa";
import { useKoaServer } from "routing-controllers";
import createConnection from "./db/db";
import { Server } from "http";
import UsersController from "./users/controller";
import AuthController from "./auth/controller";

const app = new Koa();
const server = new Server(app.callback());

const port = process.env.PORT || 3030;

useKoaServer(app, {
  cors: true,
  routePrefix: "/api",
  controllers: [AuthController, UsersController]
});

createConnection()
  .then(_ => {
    server.listen(port);
    console.log(`server listening at ${port}`);
  })
  .catch(console.error);
