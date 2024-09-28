export interface Posts {
  content: Array<Post>;
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface Post {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  content: {
    additionalProp1: {};
    additionalProp2: {};
    additionalProp3: {};
  };
  hashtags: [string];
  properties: {
    additionalProp1: {};
    additionalProp2: {};
    additionalProp3: {};
  };
  thumbnailPath: string;
  createdAt: string;
  modifiedAt: string;
  state: string;
}
