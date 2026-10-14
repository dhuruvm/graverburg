import React from 'react';
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  UserPlusIcon,
  MessageCircleIcon,
  PhoneIcon,
  SparklesIcon,
  BookmarkIcon,
  UserIcon,
  MoreCircleIcon,
  MoreHorizontalIcon,
  LockIcon,
} from './Icons';
import { useToast } from './ToastContext';

interface LeftSidebarProps {
  activeTab: 'feed' | 'profile' | 'chat' | 'showcase';
  setActiveTab: (tab: 'feed' | 'profile' | 'chat' | 'showcase') => void;
  openCreateModal: () => void;
  unreadChatCount?: number;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  setActiveTab,
  openCreateModal,
  unreadChatCount = 1,
}) => {
  const { toast } = useToast();

  const navItems = [
    {
      id: 'feed' as const,
      label: 'Home',
      icon: <HomeIcon className="w-7 h-7 stroke-[2]" />,
      badge: null,
    },
    {
      id: 'showcase' as const,
      label: 'Explore',
      icon: <SearchIcon className="w-7 h-7 stroke-[2]" />,
      badge: null,
      action: () => setActiveTab('showcase'),
    },
    {
      id: null,
      label: 'Notifications',
      icon: <BellIcon className="w-7 h-7 stroke-[2]" />,
      badge: '1',
      badgeColor: 'bg-[#1D9BF0] text-white',
      action: () => toast('Notifications: 1 new message & mention 🔔', 'celebrate'),
    },
    {
      id: null,
      label: 'Follow',
      icon: <UserPlusIcon className="w-7 h-7 stroke-[2]" />,
      badge: null,
      action: () => toast('Suggested people to follow synced in right rail ✨', 'info'),
    },
    {
      id: 'chat' as const,
      label: 'Chat',
      icon: <MessageCircleIcon className="w-7 h-7 stroke-[2]" />,
      badge: unreadChatCount > 0 ? `${unreadChatCount}` : null,
      badgeColor: 'bg-[#1D9BF0] text-white',
    },
    {
      id: null,
      label: 'Calls',
      icon: <PhoneIcon className="w-7 h-7 stroke-[2]" />,
      badge: null,
      action: () => toast('Audio & Video rooms available in Space Lounge 📞', 'info'),
    },
    {
      id: null,
      label: 'Grok',
      icon: <SparklesIcon className="w-7 h-7 stroke-[2]" />,
      badge: null,
      action: () => toast('Graver AI Assistant standing by ⚡', 'info'),
    },
    {
      id: null,
      label: 'History',
      icon: <BookmarkIcon className="w-7 h-7 stroke-[2]" />,
      badge: null,
      action: () => toast('Viewing saved vibes & bookmarks 🔖', 'info'),
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: <UserIcon className="w-7 h-7 stroke-[2]" />,
      badge: null,
    },
    {
      id: null,
      label: 'More',
      icon: <MoreCircleIcon className="w-7 h-7 stroke-[2]" />,
      badge: null,
      action: () => toast('Theme settings, display mode & privacy', 'info'),
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 xl:w-[275px] h-screen sticky top-0 px-3 xl:px-4 py-2 border-r border-[#1E2028] bg-[#0D0E12] flex-shrink-0 z-30 select-none">
      <div className="flex flex-col items-start w-full">
        {/* Brand Icon Header */}
        <div
          onClick={() => setActiveTab('feed')}
          className="w-12 h-12 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors mb-1 ml-1"
          title="GraverBurg"
        >
          <img
            src="/logo.png"
            alt="GraverBurg"
            className="w-9 h-9 object-cover rounded-xl"
          />
        </div>

        {/* Navigation list */}
        <nav className="w-full space-y-0.5">
          {navItems.map((item, idx) => {
            const isActive = item.id !== null && activeTab === item.id;
            const handleClick = item.action ?? (() => item.id && setActiveTab(item.id));
            return (
              <button
                key={idx}
                onClick={handleClick}
                className="group flex items-center gap-5 px-4 py-3 rounded-full hover:bg-white/10 transition-colors w-fit text-left text-xl text-[#E7E9EA] hover:text-white"
              >
                <div className="relative flex items-center justify-center flex-shrink-0">
                  <span className={isActive ? 'text-[#D6F174]' : 'text-[#E7E9EA] group-hover:text-white'}>
                    {item.icon}
                  </span>
                  {item.badge && (
                    <span
                      className={`absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 text-[11px] font-bold rounded-full flex items-center justify-center ${
                        item.badgeColor || 'bg-[#1D9BF0] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[20px] ${isActive ? 'font-black text-white' : 'font-normal group-hover:text-white'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Large Primary CTA Pill Button */}
        <button
          onClick={openCreateModal}
          className="w-[90%] max-w-[230px] my-3.5 py-3.5 px-8 rounded-full bg-[#D6F174] hover:bg-[#c6e45f] active:scale-[0.98] text-[#0D0E12] font-black text-[17px] tracking-wide shadow-md transition-all flex items-center justify-center"
        >
          Post
        </button>
      </div>

      {/* User Profile Pill at Bottom */}
      <div
        onClick={() => setActiveTab('profile')}
        className="w-full max-w-[260px] p-2.5 rounded-full hover:bg-white/10 cursor-pointer flex items-center justify-between transition-colors mb-2 group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
            <img src="/logo.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-bold text-white truncate">Falooda</span>
              <LockIcon className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            </div>
            <p className="text-[13px] text-zinc-500 truncate">@falooda_fr</p>
          </div>
        </div>
        <MoreHorizontalIcon className="w-5 h-5 text-zinc-400 group-hover:text-white flex-shrink-0 mr-1" />
      </div>
    </aside>
  );
};
