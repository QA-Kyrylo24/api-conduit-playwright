import { BaseController } from '../BaseController';

type RegistrationPayload = {
  username: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

export class AuthController extends BaseController {
  async signUp(payload: RegistrationPayload) {
    return this.request.post(`${process.env.API_BASE_URL}/users`, {
      data: { user: payload },
    });
  }

  async login(payload: LoginPayload) {
     return this.request.post(`${process.env.API_BASE_URL}/users/login`, {
      data: { user: payload },
    });
  }
}