/**
 * Mock quest and quest progress data.
 */

import type { QuestResponse, QuestProgressEntry } from '@/types/quest.types';

const NOW = new Date().toISOString();

export const MOCK_QUESTS: QuestResponse[] = [
  // ── Onboarding quests (1-time) ──
  {
    id: 'quest-ob-01', title: 'Day One Tour',
    description: 'Tham quan văn phòng và làm quen với các khu vực chức năng.',
    type: 'onboarding', criteria: { action: 'day_one_tour', count: 1, sortOrder: 1 },
    targetPersona: ['newcomer'], expReward: 450, badgeReward: '🏢',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-02', title: 'First meeting with Manager',
    description: 'Buổi gặp gỡ đầu tiên với Manager để trao đổi về công việc.',
    type: 'onboarding', criteria: { action: 'manager_meeting', count: 1, sortOrder: 2 },
    targetPersona: ['newcomer'], expReward: 900, badgeReward: '🤝',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-03', title: 'Cập nhật Profile Google & Slack',
    description: 'Đồng bộ thông tin và ảnh đại diện trên các nền tảng làm việc.',
    type: 'onboarding', criteria: { action: 'update_profile_tools', count: 1, sortOrder: 3 },
    targetPersona: ['newcomer'], expReward: 250, badgeReward: '🛠️',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-04', title: 'Đọc Cẩm nang Onboarding',
    description: 'Nắm vững các quy trình và quy định cơ bản dành cho nhân viên mới.',
    type: 'onboarding', criteria: { action: 'read_onboarding_guide', count: 1, sortOrder: 4 },
    targetPersona: ['newcomer'], expReward: 700, badgeReward: '📚',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-05', title: 'Ký NDA & HĐTV',
    description: 'Hoàn thành các thủ tục pháp lý và cam kết bảo mật.',
    type: 'onboarding', criteria: { action: 'sign_documents', count: 1, sortOrder: 5 },
    targetPersona: ['newcomer'], expReward: 450, badgeReward: null,
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-06', title: 'Cung cấp giấy tờ Kế toán',
    description: 'Nộp đầy đủ hồ sơ cần thiết cho bộ phận Kế toán.',
    type: 'onboarding', criteria: { action: 'submit_accounting_docs', count: 1, sortOrder: 6 },
    targetPersona: ['newcomer'], expReward: 450, badgeReward: null,
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-07', title: 'Chấm công với iCheck',
    description: 'Thực hiện chấm công lần đầu tiên bằng ứng dụng iCheck.',
    type: 'onboarding', criteria: { action: 'icheck_attendance', count: 1, sortOrder: 7 },
    targetPersona: ['newcomer'], expReward: 200, badgeReward: null,
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-08', title: 'Sign-in Slack',
    description: 'Đăng nhập và tham gia các kênh thảo luận trên Slack.',
    type: 'onboarding', criteria: { action: 'signin_slack', count: 1, sortOrder: 8 },
    targetPersona: ['newcomer'], expReward: 200, badgeReward: null,
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-09', title: 'Tham gia Group Facebook nội bộ',
    description: 'Kết nối với cộng đồng iKame trên Facebook.',
    type: 'onboarding', criteria: { action: 'join_fb_group', count: 1, sortOrder: 9 },
    targetPersona: ['newcomer'], expReward: 250, badgeReward: null,
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-10', title: 'Kích hoạt 2FA Email',
    description: 'Bảo mật tài khoản email bằng xác thực 2 lớp.',
    type: 'onboarding', criteria: { action: 'activate_2fa', count: 1, sortOrder: 10 },
    targetPersona: ['newcomer'], expReward: 450, badgeReward: null,
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-11', title: 'Làm quen với Asana',
    description: 'Hiểu cách quản lý công việc và task trên Asana.',
    type: 'onboarding', criteria: { action: 'learn_asana', count: 1, sortOrder: 11 },
    targetPersona: ['newcomer'], expReward: 550, badgeReward: '🎯',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-12', title: 'Khám phá iWiki',
    description: 'Tìm kiếm và đọc các tài liệu hướng dẫn trên iWiki.',
    type: 'onboarding', criteria: { action: 'explore_iwiki', count: 1, sortOrder: 12 },
    targetPersona: ['newcomer'], expReward: 350, badgeReward: null,
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-ob-13', title: 'Sử dụng iPerform',
    description: 'Bắt đầu thiết lập các mục tiêu hiệu suất trên iPerform.',
    type: 'onboarding', criteria: { action: 'use_iperform', count: 1, sortOrder: 13 },
    targetPersona: ['newcomer'], expReward: 350, badgeReward: null,
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  // ── Daily quests (All roles) ──
  {
    id: 'quest-d-01', title: 'Đi làm đúng giờ',
    description: 'Check-in iCheck trước 8 giờ 30 phút.',
    type: 'daily', criteria: { action: 'icheck_on_time', count: 1, sortOrder: 1 },
    targetPersona: ['all'], expReward: 100, badgeReward: '⏰',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-d-02', title: 'Gửi lời chúc Sinh nhật',
    description: 'Gửi 1 lời chúc mừng sinh nhật cho đồng nghiệp trên Dashboard.',
    type: 'daily', criteria: { action: 'birthday_wish', count: 1, sortOrder: 2 },
    targetPersona: ['all'], expReward: 50, badgeReward: '🎂',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-d-03', title: 'Gửi lời chúc Thâm niên',
    description: 'Gửi 1 lời chúc mừng thâm niên cho đồng nghiệp trên Dashboard.',
    type: 'daily', criteria: { action: 'anniversary_wish', count: 1, sortOrder: 3 },
    targetPersona: ['all'], expReward: 50, badgeReward: '🎖️',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  // ── Weekly & Monthly quests ──
  {
    id: 'quest-w-01', title: '5 ngày Đúng giờ',
    description: 'Đi làm đúng giờ liên tiếp 5 ngày trong tuần.',
    type: 'weekly', criteria: { action: 'weekly_on_time', count: 5, sortOrder: 1 },
    targetPersona: ['all'], expReward: 500, badgeReward: '🔥',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
  {
    id: 'quest-m-01', title: 'Check-in iGoal',
    description: 'Hoàn thành check-in iGoal tháng này (1 lần/tháng).',
    type: 'monthly', criteria: { action: 'igoal_checkin', count: 1, sortOrder: 1 },
    targetPersona: ['all'], expReward: 3000, badgeReward: '🏆',
    startDate: NOW, endDate: null, maxCompletions: 1, isActive: true, status: 'active',
    createdBy: 'system', createdAt: NOW, updatedAt: NOW,
  },
];

const DEFAULT_PROGRESS: QuestProgressEntry[] = [
  { questId: 'quest-ob-01', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-02', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-03', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-04', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-05', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-06', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-07', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-08', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-09', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-10', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-11', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-12', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-ob-13', progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-d-01',  progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-d-02',  progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-d-03',  progress: 0, status: 'in_progress', target: 1 },
  { questId: 'quest-w-01',  progress: 0, status: 'in_progress', target: 5 },
  { questId: 'quest-m-01',  progress: 0, status: 'in_progress', target: 1 },
];

export function getMockProgress(): QuestProgressEntry[] {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  const stored = localStorage.getItem('demoQuestProgress');
  if (stored) return JSON.parse(stored);
  return DEFAULT_PROGRESS;
}

export function saveMockProgress(progress: QuestProgressEntry[]) {
  localStorage.setItem('demoQuestProgress', JSON.stringify(progress));
}

import { updateMockExp } from './mock-profile-level-data';

export function completeMockOnboarding(action: string) {
  const current = getMockProgress();
  const quest = MOCK_QUESTS.find(q => q.criteria.action === action);
  if (!quest) return;
  
  const updated = current.map(p => {
    if (p.questId === quest.id) {
       // Add EXP
       updateMockExp(quest.expReward);
       // Move to claimed directly for "Hành trình tân thủ" 
       return { ...p, progress: p.target, status: 'claimed' };
    }
    return p;
  });
  saveMockProgress(updated);
}

export function claimMockReward(questId: string) {
  const current = getMockProgress();
  const quest = MOCK_QUESTS.find(q => q.id === questId);
  
  const updated = current.map(p => {
    if (p.questId === questId) {
       if (quest) updateMockExp(quest.expReward);
       return { ...p, status: 'claimed' };
    }
    return p;
  });
  saveMockProgress(updated);
}

export const MOCK_QUEST_PROGRESS = getMockProgress();
