import { UserModel } from "./user.model";

export class AuthModel {
  token: string;
  refreshToken: string;
  expiresIn: Date;
  user: UserModel;

  setAuth(auth: any) {
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.user = auth.user;
  }
}
