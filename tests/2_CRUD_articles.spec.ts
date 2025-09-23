import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';
import { articleSchema } from '../utils/articleSchema';
import { ArticleBuilder } from '../fixtures/ArticleBuilder';
import {UpdateArticlePayload} from '../controllers/Articles/ArticlesController';

test('ID005 GET article by slug', async ({ authedClient, createdArticleSlug }) => {
    const response = await authedClient.articles.getArticle(createdArticleSlug);

    expect(response.status()).toBe(200);

    const body = await response.json();

    const { error } = articleSchema.validate(body, { abortEarly: false });
    expect(error).toBeUndefined();

    expect(body).toHaveProperty('article');
    expect(body.article.slug).toBe(createdArticleSlug);
    expect(body.article.title).toBeDefined();
    expect(body.article.body).toBeDefined();
});

test('ID006 Delete article', async ({ authedClient, createdArticleSlug }) => {

    console.log(createdArticleSlug)
    const deleteResp = await authedClient.articles.deleteArticle(createdArticleSlug);
    expect(deleteResp.status(), `DELETE /articles/${createdArticleSlug} failed`).toBe(204);

    const response = await authedClient.articles.getArticle(createdArticleSlug);
    expect(response.status()).toBe(404);
});

test('ID007 Create article (POST)', async ({ authedClient }) => {

const articlePayload = new ArticleBuilder()
            .withTitle('My Test Article')
            .withDescription('Description for test article')
            .withBody('Body of my test article')
            .withTags(['test', 'playwright'])
            .build();
  const response = await authedClient.articles.createArticle(articlePayload);
  expect(response.status(), 'POST /articles should return 200').toBe(200);

  const body = await response.json();
  expect(body.article.title).toBe(articlePayload.title);
  expect(body.article.description).toBe(articlePayload.description);
  expect(body.article.body).toBe(articlePayload.body);
  expect(body.article.tagList).toEqual(articlePayload.tagList);
});

test('ID008 Update article (PUT)', async ({ authedClient, articleForUpdate }) => {
  const updatePayload: UpdateArticlePayload = {
    title: articleForUpdate.title + '_updated',
    description: 'Updated description',
    tagList: ["updated_tags"]
  };

  const response = await authedClient.articles.updateArticle(articleForUpdate.slug, updatePayload);
  expect(response.status()).toBe(200);

  const updated = await response.json();
  console.log(updated);
  expect(updated.article.title).toBe(updatePayload.title);
  expect(updated.article.description).toBe(updatePayload.description);
});


