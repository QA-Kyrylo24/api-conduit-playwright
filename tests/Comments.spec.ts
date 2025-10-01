import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';

test(' Add comment to article', async ({ authedClient, createdArticleSlug }) => {
    const comment = {
        body: "test123"
    };

    const commentCreated = await authedClient.articles.addComment(createdArticleSlug, comment);
    expect(commentCreated.ok()).toBeTruthy();
    const body = await commentCreated.json();
    expect(body).toHaveProperty('comment');
    expect(body.comment.body).toBe(comment.body);

    const commentID = body.comment.id;

    const getResponse = await authedClient.articles.getComments(createdArticleSlug);
    expect(getResponse.ok()).toBeTruthy();
    const comments = await getResponse.json();
    const commentForDeletion = comments.comments.find(comment => comment.id === commentID);
    expect(commentForDeletion).toBeDefined();

    const deleteResponse = await authedClient.articles.deleteComment(createdArticleSlug, commentID);
    expect(deleteResponse.ok(), 'Comment should be deleted successfully').toBeTruthy();


    const getResponseAfterDeletion = await authedClient.articles.getComments(createdArticleSlug);
    const commentsAfterDeletion = await getResponseAfterDeletion.json();
    const deletedCommentAfterDeletion = commentsAfterDeletion.comments.find(comment => comment.id === commentID);
    expect(deletedCommentAfterDeletion, 'Deleted comment should not be found').toBeUndefined();

});