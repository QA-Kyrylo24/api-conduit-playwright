import { test as base, request, APIRequestContext } from '@playwright/test';
import { APIClient } from '../controllers/APIClient';
import { validateToken } from './TokenHelper';
import { ArticleBuilder } from '../fixtures/ArticleBuilder';
import { Article } from '../utils/Interface';
import fs from 'fs';

const API_BASE_URL = process.env.API_BASE_URL;

type Fixtures = {
    token: string;
    authedRequest: APIRequestContext;
    authedClient: APIClient;
    createdArticleSlug: string;
    articleForUpdate: Article;
    writeTags: APIRequestContext;
};

export const test = base.extend<Fixtures>({
    token: async ({ request }, use) => {
        const client = new APIClient(request);
        const token = await validateToken(client);

        await use(token);
    },
    authedRequest: async ({ token }, use) => {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        await use(context);
    },

    authedClient: async ({ authedRequest }, use) => {
        const client = new APIClient(authedRequest);
        await use(client);
    },

    createdArticleSlug: async ({ authedClient }, use) => {
        const articlePayload = new ArticleBuilder()
            .withTitle('Test Article')
            .withDescription('Description for test article')
            .withBody('Body of the article')
            .build();

        const response = await authedClient.articles.createArticle(articlePayload);
        if (!response.ok()) {
            throw new Error(`Failed to create article: ${response.status()}`);
        }

        const body = await response.json();
        const slug = body.article.slug;
        await use(slug);
        await authedClient.articles.deleteArticle(slug);
    },
    articleForUpdate: async ({ authedClient }, use) => {
        const articlePayload = new ArticleBuilder()
            .withTitle('Test Article')
            .withDescription('Description for test article')
            .withBody('Body of the article')
            .build();

        const response = await authedClient.articles.createArticle(articlePayload);
        if (!response.ok()) {
            throw new Error(`Failed to create article: ${response.status()}`);
        }

        const body = await response.json();
        const article = body.article;
        await use(article);
        await authedClient.articles.deleteArticle(article.slug);
    },
    writeTags: async ({ request }, use) => {
        const resp = await request.get(`${process.env.API_BASE_URL}/tags`);
        if (!resp.ok()) {
            throw new Error(`Failed to fetch tags: ${resp.status()}`);
        }
        const body = await resp.json();
        const tags: string[] = body.tags;
        fs.writeFileSync('tags.csv', tags.join('\n'), 'utf-8');
        await use(request);

    },


})