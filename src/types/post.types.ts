export interface PostLink {
  id: string;
  file_name: string;
  post_id: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface PostResponse {
  id: string;
  title: string | null;
  content: string;
  category_id: string;
  user_id: string;
  user_name?: string;
  user_avatar?: string;
  is_deleted: boolean;
  public_date: string;
  view_count: number;
  target_audience: string;
  created_at: string;
  updated_at: string;
  links: PostLink[];
  like_count?: number;
  comment_count?: number;
  is_liked?: boolean;
}

export interface CreatePostRequest {
  content: string;
  title?: string;
  category_id?: string;
  target_audience?: string;
}

export interface CommentAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface CommentResponse {
  id: string;
  post_id: string;
  user_id: string;
  author: CommentAuthor;
  content: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  is_liked: boolean;
  replies: CommentResponse[];
  total_replies: number;
}

export interface CreateCommentRequest {
  postId: string;
  content: string;
  parentId?: string;
}
