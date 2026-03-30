import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UsersIcon } from '@phosphor-icons/react';
import { Button, ScrollArea, Skeleton } from '@frontend-team/ui-kit';
import { LeaderboardCard, UserStatsCard } from '@/components';
import { useSidebarData } from '@/hooks/useSidebarData';
import { useEventDetail } from './hooks/useEventDetail';

function EventDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-[320px] w-full rounded-2xl" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { event, isLoading } = useEventDetail(id ?? '');
  const { userStats, leaderboard, isLoading: isSidebarLoading } = useSidebarData();

  return (
    <div className="p-6">
      <div className="grid grid-cols-[6fr_4fr] gap-12">
        <div className="flex flex-col gap-6">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text_secondary hover:text_primary transition-colors cursor-pointer bg-transparent border-none outline-none w-fit"
          >
            <ArrowLeftIcon size={16} weight="bold" />
            Quay lại sự kiện
          </button>

          {isLoading || !event ? (
            <EventDetailSkeleton />
          ) : (
            <div className="flex flex-col gap-6">
              {/* Hero image */}
              {event.thumbnail && (
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full aspect-[2.5/1] object-cover radius_16 border border_primary shadow_m"
                />
              )}

              {/* Title & Meta */}
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold text_primary leading-tight">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm font-medium text_secondary bg_secondary px-3 py-1.5 radius_round">
                    <CalendarIcon size={16} weight="fill" className="fg_accent_primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text_secondary bg_secondary px-3 py-1.5 radius_round">
                    <ClockIcon size={16} weight="fill" className="fg_accent_primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text_secondary bg_secondary px-3 py-1.5 radius_round">
                    <UsersIcon size={16} weight="fill" className="fg_accent_primary" />
                    <span>Toàn công ty</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg_secondary" />

              {/* Content */}
              <div
                className="text_primary text-base leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: event.content }}
              />

              {/* CTA */}
              <div className="flex gap-3 pt-4 border-t border_primary mt-2">
                <Button
                  size="l"
                  className="bg_accent_primary text_contrast radius_8 px-8 hover:shadow_m transition-all active:scale-95"
                >
                  Tham gia ngay
                </Button>
                <Button variant="border" size="l" className="radius_8">
                  Thêm vào lịch
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sticky top-6 self-start">
          <ScrollArea viewportClassName="max-h-[calc(100vh-3rem)]">
            <div className="flex flex-col gap-4">
              {isSidebarLoading ? (
                <>
                  <Skeleton className="h-28 w-full rounded-2xl" />
                  <Skeleton className="h-64 w-full rounded-2xl" />
                </>
              ) : (
                <>
                  <UserStatsCard stats={userStats} />
                  <LeaderboardCard users={leaderboard} />
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
