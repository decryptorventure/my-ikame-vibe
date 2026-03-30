import { Card, CardContent } from '@frontend-team/ui-kit';
import PostCard from './PostCard';
import CreatePostCard from './CreatePostCard';
import type { Post } from '../types';

interface PostFeedProps {
  posts: Post[];
  onPostClick?: (postId: string) => void;
}

export default function PostFeed({ posts, onPostClick }: PostFeedProps) {
  return (
    <div className="flex flex-col gap-6">
      <CreatePostCard />
      
      <Card shadow="none" className="overflow-hidden border-0 bg_canvas_primary">
        <CardContent className="px-6 pt-6 pb-2">
          <h3 className="font-semibold text_primary">Đừng bỏ lỡ tại Ikame</h3>
        </CardContent>
      <div>
        {posts.map((post, index) => (
          <div key={post.id}>
            {index > 0 && <hr className="border_primary" />}
            <PostCard post={post} onClick={() => onPostClick?.(post.id)} />
          </div>
        ))}
        </div>
      </Card>
    </div>
  );
}
