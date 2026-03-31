import { useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import homeIcon from '@/assets/home.png';
import homeActiveIcon from '@/assets/home-active.png';
import medalStarIcon from '@/assets/medal-star.png';
import medalStarActiveIcon from '@/assets/medal-star-active.png';
import calendarIcon from '@/assets/calendar.png';
import calendarActiveIcon from '@/assets/calendar-active.png';
import giftIcon from '@/assets/gift.png';
import giftActiveIcon from '@/assets/gift-active.png';
import userSquareIcon from '@/assets/user-square.png';
import userSquareActiveIcon from '@/assets/user-square-active.png';
import iCheckIcon from '@/assets/iCheck.png';
import iGoalIcon from '@/assets/iGoal.png';
import iWikiIcon from '@/assets/iWiki.png';
import { ROUTES } from '@/constants';
import type { SimpleSidebarGroup } from '@frontend-team/ui-kit';

const ROUTE_TO_ID: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'dashboard',
  [ROUTES.IQUEST]: 'iquest',
  [ROUTES.EVENTS]: 'events',
  [ROUTES.IREWARD]: 'ireward',
  [ROUTES.PROFILE]: 'profile',
  [ROUTES.ICHECK]: 'icheck',
  [ROUTES.IGOAL]: 'igoal',
  [ROUTES.IWIKI]: 'iwiki',
  [ROUTES.ONBOARDING_JOURNEY]: 'journey',
};

export default function useSidebarNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const groups: SimpleSidebarGroup[] = useMemo(
    () => [
      {
        id: 'main',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: <img src={homeIcon} alt="Dashboard" className="size-6" />, activeIcon: <img src={homeActiveIcon} alt="Dashboard" className="size-6" />, href: ROUTES.DASHBOARD },
          { id: 'journey', label: 'Hành trình', icon: <img src={medalStarIcon} alt="Hành trình" className="size-6" />, activeIcon: <img src={medalStarActiveIcon} alt="Hành trình" className="size-6" />, href: ROUTES.ONBOARDING_JOURNEY },
          { id: 'iquest', label: 'iQuest', icon: <img src={medalStarIcon} alt="iQuest" className="size-6" />, activeIcon: <img src={medalStarActiveIcon} alt="iQuest" className="size-6" />, href: ROUTES.IQUEST },
          { id: 'events', label: 'Sự kiện', icon: <img src={calendarIcon} alt="Sự kiện" className="size-6" />, activeIcon: <img src={calendarActiveIcon} alt="Sự kiện" className="size-6" />, href: ROUTES.EVENTS },
          { id: 'ireward', label: 'iReward', icon: <img src={giftIcon} alt="iReward" className="size-6" />, activeIcon: <img src={giftActiveIcon} alt="iReward" className="size-6" />, href: ROUTES.IREWARD },
          { id: 'profile', label: 'Hồ sơ', icon: <img src={userSquareIcon} alt="Hồ sơ" className="size-6" />, activeIcon: <img src={userSquareActiveIcon} alt="Hồ sơ" className="size-6" />, href: ROUTES.PROFILE },
        ],
      },
      {
        id: 'apps',
        items: [
          { id: 'icheck', label: 'iCheck', icon: <img src={iCheckIcon} alt="iCheck" className="size-6" />, href: ROUTES.ICHECK },
          { id: 'igoal', label: 'iGoal', icon: <img src={iGoalIcon} alt="iGoal" className="size-6" />, href: ROUTES.IGOAL },
          { id: 'iwiki', label: 'iWiki', icon: <img src={iWikiIcon} alt="iWiki" className="size-6" />, href: ROUTES.IWIKI },
        ],
      },
    ],
    [],
  );

  const activeId = useMemo(() => {
    const match = Object.entries(ROUTE_TO_ID).find(([route]) => pathname.startsWith(route));
    return match ? match[1] : 'dashboard';
  }, [pathname]);

  const onNavigate = useCallback(
    (_id: string, href?: string) => {
      if (href) navigate(href);
    },
    [navigate],
  );

  return { groups, activeId, onNavigate };
}
