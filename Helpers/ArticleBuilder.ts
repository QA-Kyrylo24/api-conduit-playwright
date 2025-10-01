export type ArticlePayload = {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
};

export class ArticleBuilder {
  private payload: ArticlePayload;

  constructor() {
    this.payload = {
      title: 'Default Title',
      description: 'Default description',
      body: 'Default body',
      tagList: [],
    };
  }

  withTitle(title: string) {
    this.payload.title = title;
    return this;
  }

  withDescription(desc: string) {
    this.payload.description = desc;
    return this;
  }

  withBody(body: string) {
    this.payload.body = body;
    return this;
  }

  withTags(tags: string[]) {
    this.payload.tagList = tags;
    return this;
  }

  build() {
    return this.payload;
  }
}