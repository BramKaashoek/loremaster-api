import * as Koa from "koa";
import { useKoaServer, Action, BadRequestError } from "routing-controllers";
import createConnection from "./db/db";
import { Server } from "http";
import UsersController from "./users/controller";
import AuthController from "./auth/controller";
import CampaignController from "./campaigns/controllers";
import { jwt } from "./jwt";
import User from "./users/entity";

const app = new Koa();
const server = new Server(app.callback());

const port = process.env.PORT || 3030;

useKoaServer(app, {
  cors: true,
  routePrefix: "/api",
  controllers: [AuthController, CampaignController, UsersController],
  authorizationChecker: (action: Action) => {
    const authHeader: string = action.request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const [, token] = authHeader.split(" ");
      try {
        const auth = !!(token && jwt.verify(token));
        return auth;
      } catch (e) {
        throw new BadRequestError(e);
      }
    }
    return false;
  },
  currentUserChecker: (action: Action) => {
    const authHeader: string = action.request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const [, token] = authHeader.split(" ");
      const id = jwt.verify(token);
      console.log(id);
      return User.findOne({ where: { id } });
    }
    return undefined;
  }
});

createConnection()
  .then(_ => {
    server.listen(port);
    console.log(`server listening at ${port}`);
  })
  .catch(console.error);
