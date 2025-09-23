import { BaseController } from '../BaseController';

export type CreateArticlePayload = {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
};

export type UpdateArticlePayload = {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
};

export type CommentPayload = {
    body: string;
};

export class ArticlesController extends BaseController {
    async createArticle(payload: CreateArticlePayload) {
        return this.request.post(`${process.env.API_BASE_URL}/articles`, {
            data: { article: payload },
        });
    }

    async getArticle(slug: string) {
        return this.request.get(`${process.env.API_BASE_URL}/articles/${slug}`);
    }

    async updateArticle(slug: string, payload: UpdateArticlePayload) {
        return this.request.put(`${process.env.API_BASE_URL}/articles/${slug}`, {
            data: { article: payload },
        });
    }

    async deleteArticle(slug: string) {
        return this.request.delete(`${process.env.API_BASE_URL}/articles/${slug}`);
    }

    async getArticleByTag(tag: string) {
        return this.request.get(`${process.env.API_BASE_URL}/articles?offset=0&limit=10&tag=${tag}`);
    }

    async addComment(slug: string, comment: CommentPayload) {
        return this.request.post(`${process.env.API_BASE_URL}/articles/${slug}/comments`, {
            data: { comment }
        });
    }

    async getComments(slug: string) {
        return this.request.get(`${process.env.API_BASE_URL}/articles/${slug}/comments`);
    }

    async getComment(slug: string, commentId: string) {
        return this.request.get(`${process.env.API_BASE_URL}/articles/${slug}/comments/${commentId}`);
    }
    async deleteComment(slug: string, commentId: string) {
        return this.request.delete(`${process.env.API_BASE_URL}/articles/${slug}/comments/${commentId}`);
    }
}