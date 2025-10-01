import { faker } from '@faker-js/faker';
import { UpdateUserPayload } from '../controllers/Users/UsersController';

export class UserFactory {
    static createUpdateUserPayload(
    overrides: UpdateUserPayload = {}
  ): UpdateUserPayload {
    return {
      username: `user${Date.now()}`,
      email: process.env.EMAIL,
      bio: 'Default bio',
      image: undefined,
      ...overrides,
    };
  }
}