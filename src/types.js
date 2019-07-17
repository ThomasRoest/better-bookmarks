//@flow

export interface IBookmark {
  id: string;
  createdAt?: number;
  pinned: boolean;
  tag: string;
  title: string;
  url: string;
  userId: string;
}
