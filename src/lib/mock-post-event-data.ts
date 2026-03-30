/** Mock post and event data for Dashboard newsfeed and Events page. */

import type { PostResponse, CommentResponse } from '@/types/post.types';
import type { EventResponse } from '@/types/event.types';

const ago = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
const future = (days: number, hour = 9) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

// ─── Posts ────────────────────────────────────────────────────────────────────

export const MOCK_POSTS: PostResponse[] = [
  {
    id: 'post-ai-001', title: 'Chúc mừng thành viên mới!',
    content: '<p><b>iKame AI 🤖</b> vừa ghi nhận: Thành viên <b>Nguyễn Văn A</b> đã xuất sắc hoàn thành tất cả nhiệm vụ trong <b>Hành trình Tân thủ</b>! Chào mừng bạn chính thức gia nhập gia đình iKame! 🎉🚀</p>',
    category_id: 'cat-ai', user_id: 'iKame AI 🤖', is_deleted: false,
    public_date: ago(1), view_count: 120, target_audience: 'all',
    created_at: ago(1), updated_at: ago(1), links: [{ id: 'lnk-ai-1', file_name: 'onboarding.jpg', post_id: 'post-ai-001', url: 'https://picsum.photos/seed/celebrate/800/400', created_at: '', updated_at: '' }],
    like_count: 54, comment_count: 18,
  },
  {
    id: 'post-001', title: 'Chào cả nhà!',
    content: '<p>Mình là Dung, vừa join team Frontend tuần này. Rất vui được làm việc cùng mọi người! 🎉 Mình có 3 năm kinh nghiệm React/TypeScript, hi vọng đóng góp được nhiều cho team!</p>',
    category_id: 'cat-001', user_id: 'Nguyen Van Dung', is_deleted: false,
    public_date: ago(2), view_count: 24, target_audience: 'all',
    created_at: ago(2), updated_at: ago(2), links: [],
    like_count: 12, comment_count: 4,
  },
  {
    id: 'post-ai-002', title: 'Kỷ niệm thâm niên',
    content: '<p><b>iKame AI 🤖</b>: Chúc mừng chị <b>Trần Thị B</b> đã đồng hành cùng iKame được tròn <b>3 năm</b>! Cảm ơn chị vì những đóng góp tuyệt vời cho sự phát triển của công ty. Chúc chị luôn rạng rỡ và thành công! 🎖️✨</p>',
    category_id: 'cat-ai', user_id: 'iKame AI 🤖', is_deleted: false,
    public_date: ago(4), view_count: 85, target_audience: 'all',
    created_at: ago(4), updated_at: ago(4), links: [],
    like_count: 89, comment_count: 31,
  },
  {
    id: 'post-002', title: null,
    content: '<p>Team mình vừa hoàn thành sprint 12 với 100% story points! 🚀 Cảm ơn tất cả mọi người đã cố gắng — đặc biệt cảm ơn anh Duc và chị Lan đã support ngoài giờ để fix bug production.</p>',
    category_id: 'cat-002', user_id: 'Tran Thi Lan', is_deleted: false,
    public_date: ago(5), view_count: 47, target_audience: 'all',
    created_at: ago(5), updated_at: ago(5),
    links: [{ id: 'lnk-001', file_name: 'team-photo.jpg', post_id: 'post-002', url: 'https://picsum.photos/seed/team/800/400', created_at: '', updated_at: '' }],
    like_count: 36, comment_count: 9,
  },
];

// ─── Comments ──────────────────────────────────────────────────────────────────

export const MOCK_COMMENTS: CommentResponse[] = [
  {
    id: 'cmt-001', post_id: 'post-001', user_id: 'user-001',
    author: { id: 'user-001', name: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?u=user-001' },
    content: 'Chào mừng Dung gia nhập team nhé! 🎉',
    created_at: ago(1), updated_at: ago(1),
    like_count: 2, is_liked: false, replies: [], total_replies: 0
  },
  {
    id: 'cmt-002', post_id: 'post-001', user_id: 'user-002',
    author: { id: 'user-002', name: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?u=user-002' },
    content: 'Frontend team lại có thêm "hàng khủng" rồi, welcome em!',
    created_at: ago(1.5), updated_at: ago(1.5),
    like_count: 5, is_liked: true, replies: [], total_replies: 0
  },
  {
    id: 'cmt-003', post_id: 'post-ai-001', user_id: 'user-003',
    author: { id: 'user-003', name: 'Lê Văn C', avatar: 'https://i.pravatar.cc/150?u=user-003' },
    content: 'Chúc mừng bạn A chính thức "lên sàn"! 😂 Ăn khao thôi nhỉ?',
    created_at: ago(0.5), updated_at: ago(0.5),
    like_count: 12, is_liked: false, replies: [], total_replies: 0
  },
];

// ─── Events ───────────────────────────────────────────────────────────────────

export const MOCK_EVENTS: EventResponse[] = [
  {
    id: 'event-001', title: 'All-Hands Meeting Q2 2026',
    thumbnail: 'https://picsum.photos/seed/event1/400/200',
    content_type: 'text',
    content: '<p>Buổi họp toàn công ty Q2 2026. Cập nhật định hướng chiến lược và kết quả kinh doanh. Chào đón quý II hứa hẹn rực rỡ và thành công!</p>',
    redirect_url: null, start_event: future(3, 9), start_show: future(1, 0), end_event: future(3, 11),
    created_at: ago(24), updated_at: ago(24),
  },
  {
    id: 'event-002', title: 'iKame Tech Talk: AI trong phát triển sản phẩm',
    thumbnail: 'https://picsum.photos/seed/event2/400/200',
    content_type: 'text',
    content: '<p>Khám phá cách AI đang thay đổi quy trình phát triển sản phẩm tại iKame. Workshop sẽ tập trung vào việc áp dụng bài bản AI vào phát triển phần mềm và tối ưu hóa vận hành.</p>',
    redirect_url: null, start_event: future(7, 14), start_show: future(4, 0), end_event: future(7, 16),
    created_at: ago(48), updated_at: ago(48),
  },
];
