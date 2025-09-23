import type { APIRequestContext } from '@playwright/test';
import { AuthController } from './Auth/AuthController';
import { UsersController } from './Users/UsersController';
import { ArticlesController } from './Articles/ArticlesController';
export class APIClient {
  auth: AuthController;
  users: UsersController;
  articles: ArticlesController;

  constructor(requestContext: APIRequestContext) {
    this.auth = new AuthController(requestContext);
    this.users = new UsersController(requestContext);
    this.articles = new ArticlesController(requestContext);
  }
}