import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { APIClient } from '../controllers/APIClient';
import { readTagsFromCsv } from '../utils/csvReader';
const tags = readTagsFromCsv();

test.describe.parallel('Search articles by tags', () => {
  for (const tag of tags) {
    test(`should find articles with tag "${tag}"`, async ({ request }) => {
      const client = new APIClient(request);
      const resp = await client.articles.getArticleByTag(tag);

      expect(resp.ok(), `Failed for tag "${tag}"`).toBeTruthy();

      const body = await resp.json();

      for (const article of body.articles) {
        expect(article.tagList, `Article "${article.title}" should contain tag "${tag}"` ).toContain(tag);
      }
    });
  }
});
