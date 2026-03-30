import { useDispatch, useSelector } from 'react-redux';
import { SignOutIcon, UserIcon, ArrowClockwiseIcon } from '@phosphor-icons/react';
import { 
  Avatar, 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  SegmentedControl
} from '@frontend-team/ui-kit';

import { useGetMyProfileQuery } from '@/services/userProfile.service';
import { useAuth } from '@/state/contexts/auth-context';
import { getInitials } from '@/utils/getInitials';
import { RootState } from '@/state/store';
import { setPersona, resetDemo, DemoPersona } from '@/state/slices/demoSlice';

export default function SidebarFooter() {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { data: profile } = useGetMyProfileQuery();
  const currentPersona = useSelector((state: RootState) => state.demo.persona);

  const name = profile?.name ?? '';
  const initials = getInitials(name);

  const roleLabels: Record<string, string> = {
    newcomer: 'Newcomer',
    member: 'Member',
    manager: 'Manager',
    admin: 'Admin',
  };
  const role = profile?.employee_status === 'newcomer' ? 'newcomer' : (profile?.role_project_id ?? 'member');

  const personaOptions = [
    { value: 'newcomer', label: 'NEW' },
    { value: 'member', label: 'MBR' },
    { value: 'manager', label: 'MGR' },
    { value: 'admin', label: 'ADM' },
  ];

  return (
    <div className="flex items-center gap-3 w-full px-2 py-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="cursor-pointer radius_round outline-none hover:ring-2 ring_brand_primary transition-all p-0.5">
            <Avatar
              src={profile?.avatar}
              alt={name}
              fallback={initials}
              size="m"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="end" sideOffset={12} className="w-56 p-2">
          {/* Persona Switcher Section */}
          <div className="px-2 py-2 flex flex-col gap-2">
             <span className="text-[10px] font-bold text_tertiary uppercase flex items-center gap-1.5">
               <UserIcon weight="bold" /> Switch Demo Role
             </span>
             <SegmentedControl
               options={personaOptions}
               value={currentPersona}
               onValueChange={(val) => dispatch(setPersona(val as DemoPersona))}
               size="s"
             />
          </div>

          <DropdownMenuSeparator className="my-2" />
          
          <DropdownMenuItem 
            onSelect={() => dispatch(resetDemo())}
            className="text_secondary text-xs"
          >
            <ArrowClockwiseIcon className="size-4" />
            Reset Dữ liệu Demo
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2" />

          <DropdownMenuItem onSelect={logout} className="text_error text-xs font-semibold">
            <SignOutIcon className="size-4" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex flex-col min-w-0 flex-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto overflow-hidden">
        <span className="text-[10px] font-bold text_brand_primary uppercase tracking-wider truncate">
          {roleLabels[role]}
        </span>
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm font-semibold text_primary truncate leading-tight">
            {name}
          </span>
          {profile?.equipped_achievement_badge && (
            <span className="text-sm shrink-0" title={profile.equipped_achievement_title}>
              {profile.equipped_achievement_badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
