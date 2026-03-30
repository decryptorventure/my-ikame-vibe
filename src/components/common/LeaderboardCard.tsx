import { useState } from 'react';
import { 
  Avatar, 
  Card, 
  CardContent, 
  Modal,
  Tabs
} from '@frontend-team/ui-kit';
import { TrophyIcon, UsersThreeIcon, UserIcon } from '@phosphor-icons/react';
import medal1 from '@/assets/medal-1.png';
import medal2 from '@/assets/medal-2.png';
import medal3 from '@/assets/medal-3.png';
import type { LeaderboardUser } from '@/types/shared.types';

const MEDAL_MAP: Record<number, string | undefined> = {
  1: medal1,
  2: medal2,
  3: medal3,
};

interface LeaderboardCardProps {
  users: LeaderboardUser[];
}

export default function LeaderboardCard({ users }: LeaderboardCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const top5 = users.slice(0, 5);

  const MOCK_TEAMS = [
    { rank: 1, name: 'Frontend Team', level: 45, exp: 125000 },
    { rank: 2, name: 'Backend Team', level: 42, exp: 118000 },
    { rank: 3, name: 'Game Design', level: 38, exp: 95000 },
    { rank: 4, name: 'Art Team', level: 35, exp: 88000 },
    { rank: 5, name: 'HR Team', level: 30, exp: 75000 },
  ];

  const tabItems = [
    {
      value: 'personal',
      label: (
        <div className="flex items-center gap-2">
          <UserIcon weight="bold" /> Cá nhân
        </div>
      ),
      content: (
        <div className="flex flex-col gap-1 mt-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-4 p-3 hover:bg_secondary radius_12 transition-colors border-b border_primary last:border-0">
              <span className="w-8 text-center text-sm font-bold text_tertiary">#{user.rank}</span>
              <Avatar size="m" src={user.avatarUrl} alt={user.name} fallback={user.avatarInitials} />
              <div className="flex flex-col flex-1">
                <span className="text-sm font-semibold text_primary">{user.name}</span>
                <span className="text-xs text_tertiary">Cấp độ {user.level}</span>
              </div>
              {MEDAL_MAP[user.rank] && (
                <img src={MEDAL_MAP[user.rank]} alt="medal" className="size-6" />
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      value: 'team',
      label: (
        <div className="flex items-center gap-2">
          <UsersThreeIcon weight="bold" /> Team
        </div>
      ),
      content: (
        <div className="flex flex-col gap-1 mt-4">
          {MOCK_TEAMS.map((team) => (
            <div key={team.name} className="flex items-center gap-4 p-3 hover:bg_secondary radius_12 transition-colors border-b border_primary last:border-0">
              <span className="w-8 text-center text-sm font-bold text_tertiary">#{team.rank}</span>
              <div className="size-10 radius_round bg_brand_secondary flex items-center justify-center text_brand_primary font-bold">
                {team.name.charAt(0)}
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-semibold text_primary">{team.name}</span>
                <span className="text-xs text_tertiary">Tổng EXP: {team.exp.toLocaleString()}</span>
              </div>
              <div className="text-xs font-bold text_brand_primary bg_brand_secondary/20 px-2 py-1 radius_4">
                Lv.{team.level}
              </div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <>
      <Card shadow="none" className="border-0 bg_canvas_primary">
        <CardContent className="p-4">
          <h3 className="mb-4 font-semibold text_primary uppercase text-[10px] tracking-widest opacity-60">Bảng xếp hạng</h3>

          <div className="flex flex-col gap-3">
            {top5.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="w-6 flex justify-center">
                  {MEDAL_MAP[user.rank] ? (
                    <img src={MEDAL_MAP[user.rank]} alt={`rank ${user.rank}`} className="size-5 shrink-0" />
                  ) : (
                    <span className="text-xs font-bold text_tertiary">#{user.rank}</span>
                  )}
                </div>
                <Avatar size="m" src={user.avatarUrl} alt={user.name} fallback={user.avatarInitials} className="border_primary border" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text_primary truncate">{user.name}</span>
                  <span className="text-[10px] font-medium text_tertiary uppercase">lv.{user.level}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-bold text_brand_primary hover:underline uppercase tracking-wider cursor-pointer"
            >
              Xem tất cả
            </button>
          </div>
        </CardContent>
      </Card>

      <Modal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        title="Bảng xếp hạng iQuest"
        size="lg"
      >
        <div className="flex flex-col">
          <div className="bg_amber_subtle p-4 radius_12 mb-4 flex items-center gap-3 border border_tertiary opacity-90">
             <TrophyIcon className="fg_warning size-8" weight="fill" />
             <p className="text-sm text_secondary">Cùng theo dõi và bứt phá trên hành trình chinh phục các nhiệm vụ iQuest!</p>
          </div>
          <Tabs items={tabItems} defaultValue="personal" />
        </div>
      </Modal>
    </>
  );
}
