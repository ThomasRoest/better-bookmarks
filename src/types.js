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

export interface IAuth {
  status: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  uid: string;
}

export interface ITag {
  id: string;
  title: string;
  userId: string;
}
