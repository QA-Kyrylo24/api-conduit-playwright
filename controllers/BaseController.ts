import type { APIRequestContext } from '@playwright/test';

export class BaseController {
    request: APIRequestContext;
    constructor(requestContext: APIRequestContext) {
        this.request = requestContext;
    }

}