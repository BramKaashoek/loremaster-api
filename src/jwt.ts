import * as jsonwebtoken from "jsonwebtoken";

interface IJwtPayload {
  id: string;
}

const secret = process.env.JWT_SECRET || "a super secret secret";

export const jwt = {
  sign: (payload: IJwtPayload) => jsonwebtoken.sign(payload, secret),
  verify: (token: string) => jsonwebtoken.verify(token, secret)
};
