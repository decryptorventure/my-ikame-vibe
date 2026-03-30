import { useEffect, useMemo } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { SimpleSidebar } from '@frontend-team/ui-kit';
import { useSidebarNav } from '@/hooks';
import { ROUTES } from '@/constants';
import logo from '@/assets/logo.png';
import { ScrollToTop, ChatbotBubble } from '@/components';
import SidebarFooter from '@/components/SidebarFooter';
import { useGetMyProfileQuery } from '@/services/userProfile.service';
import { hasSeenWelcome } from '@/pages/Onboarding/hooks';

export default function AppLayout() {
  const { groups, activeId, onNavigate } = useSidebarNav();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile } = useGetMyProfileQuery();

  useEffect(() => {
    // Nếu là newcomer và chưa xem onboarding, và không phải đang ở trang onboarding
    if (profile?.employee_status === 'newcomer' && !hasSeenWelcome() && location.pathname !== ROUTES.ONBOARDING) {
      navigate(ROUTES.ONBOARDING, { replace: true });
    }
  }, [profile, navigate, location.pathname]);

  const sidebarHeader = useMemo(
    () => (
      <Link to={ROUTES.HOME}>
        <img src={logo} alt="iKame" className="size-10 cursor-pointer" />
      </Link>
    ),
    [],
  );

  return (
    <div className="bg_secondary w-screen h-screen overflow-hidden">
      <SimpleSidebar
        groups={groups}
        activeId={activeId}
        onNavigate={onNavigate}
        header={sidebarHeader}
        footer={<SidebarFooter />}
      />
      <main className="h-full overflow-y-auto pl-16">
        <ScrollToTop />
        <div className="max-w-[1200px] mx-auto">
          <Outlet />
        </div>
      </main>
      <ChatbotBubble />
    </div>
  );
}
