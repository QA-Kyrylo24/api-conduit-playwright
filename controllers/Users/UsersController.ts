import { BaseController } from '../BaseController';

export type UpdateUserPayload = {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
};
export class UsersController extends BaseController {
  async getUser() {
    return this.request.get(`${process.env.API_BASE_URL}/user`);
  }

  async updateUser(payload: UpdateUserPayload) {
    return this.request.put(`${process.env.API_BASE_URL}/user`, {
      data: { user: payload },
    });
  }
}