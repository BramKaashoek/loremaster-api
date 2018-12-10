import * as Koa from "koa";
import { useKoaServer } from "routing-controllers";
import setupDb from "./db";
import { Server } from "http";
import UsersController from "./users/controller";

const app = new Koa();
const server = new Server(app.callback());

const port = process.env.PORT || 3030;

useKoaServer(app, {
  cors: true,
  routePrefix: "/api",
  controllers: [UsersController]
});

setupDb()
  .then(_ => {
    server.listen(port);
    console.log(`server listening at ${port}`);
  })
  .catch(console.error);
