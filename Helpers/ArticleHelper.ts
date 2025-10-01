import { ArticleBuilder } from '../Helpers/ArticleBuilder';

export class ArticleHelper {
  constructor(private authedClient) {}

  async createArticle(title: string, description: string, body: string) {
    const payload = new ArticleBuilder()
      .withTitle(title)
      .withDescription(description)
      .withBody(body)
      .build();

    const response = await this.authedClient.articles.createArticle(payload);
    if (!response.ok()) {
      throw new Error(`Failed to create article: ${response.status()}`);
    }

    const bodyJson = await response.json();
    return bodyJson.article;
  }

  async deleteArticle(slug: string) {
    const response = await this.authedClient.articles.deleteArticle(slug);
    if (!response.ok()) {
      throw new Error(`Failed to delete article: ${response.status()}`);
    }
  }
}