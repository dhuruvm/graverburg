import React from 'react';
import {
  HomeIcon,
  BellIcon,
  MessageCircleIcon,
  UserIcon,
  SearchIcon,
  BookmarkIcon,
  SparklesIcon,
  PlusIcon,
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
  unreadChatCount = 2,
}) => {
  const { toast } = useToast();

  const navItems = [
    {
      id: 'feed' as const,
      label: 'Home',
      icon: <HomeIcon className="w-5 h-5" />,
      badge: null,
    },
    {
      id: 'showcase' as const,
      label: 'UI Mockups',
      icon: <SparklesIcon className="w-5 h-5" />,
      badge: '3 Screens',
      badgeColor: 'bg-[#D6F174] text-[#0D0E12] font-black',
    },
    {
      id: null,
      label: 'Search',
      icon: <SearchIcon className="w-5 h-5" />,
      badge: null,
      action: () => toast('Search active: explore trending tags in the right rail ⚡', 'info'),
    },
    {
      id: null,
      label: 'Notifications',
      icon: <BellIcon className="w-5 h-5" />,
      badge: '3',
      badgeColor: 'bg-[#FA5D54] text-white',
      action: () => toast('Notifications: Aria & Ren liked your post · 1 new message 🔔', 'celebrate'),
    },
    {
      id: 'chat' as const,
      label: 'Messages',
      icon: <MessageCircleIcon className="w-5 h-5" />,
      badge: unreadChatCount > 0 ? `${unreadChatCount}` : null,
      badgeColor: 'bg-[#FA5D54] text-white',
    },
    {
      id: null,
      label: 'Bookmarks',
      icon: <BookmarkIcon className="w-5 h-5" />,
      badge: null,
      action: () => toast('Bookmarks: 4 saved vibes stored in your personal vault 🔖', 'info'),
    },
    {
      id: 'profile' as const,
      label: 'My Space',
      icon: <UserIcon className="w-5 h-5" />,
      badge: null,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-60 xl:w-64 h-screen sticky top-0 p-4 border-r border-[#1E2028] bg-[#0D0E12] flex-shrink-0 z-30 select-none">
      <div>
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('feed')}
          className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-[#14151C] transition-all cursor-pointer group mb-6"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#1A1B22] border border-white/10 group-hover:scale-105 transition-transform flex-shrink-0">
            <img src="/logo.png" alt="GraverBurg Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-display font-black text-lg text-white tracking-tight group-hover:text-[#D6F174] transition-colors">
              GraverBurg
            </span>
            <p className="text-[10px] font-medium text-zinc-500 leading-none mt-0.5">
              Your profile. Your world.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-0.5 mb-5">
          {navItems.map((item, idx) => {
            const isActive = item.id !== null && activeTab === item.id;
            const handleClick = item.action ?? (() => item.id && setActiveTab(item.id));
            return (
              <button
                key={idx}
                onClick={handleClick}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#181920] text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-[#13141A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#D6F174]' : 'text-zinc-400 group-hover:text-white'}>
                    {item.icon}
                  </span>
                  <span className={isActive ? 'font-bold text-white' : ''}>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`min-w-[20px] h-5 px-1.5 text-[10px] font-extrabold rounded-full flex items-center justify-center ${
                      item.badgeColor || 'bg-zinc-700 text-zinc-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* New Post CTA — compact, icon only becomes text on hover */}
        <button
          onClick={openCreateModal}
          className="w-full py-2.5 px-4 rounded-xl bg-[#D6F174] hover:bg-[#c9e663] active:scale-[0.98] text-[#0D0E12] font-display font-black text-sm tracking-wide transition-all flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          <span>New Post</span>
        </button>

        {/* Space Expiry — one location, clear label */}
        <div className="mt-4 px-3 py-2.5 rounded-xl bg-[#1A1B22] border border-[#F7C948]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F7C948] animate-pulse flex-shrink-0" />
            <span className="text-[11px] font-semibold text-zinc-300">Space resets in</span>
          </div>
          <span className="text-[11px] font-bold text-[#F7C948] tabular-nums">7h 15m</span>
        </div>
      </div>

      {/* User Footer */}
      <div
        onClick={() => setActiveTab('profile')}
        className="p-2.5 rounded-xl bg-[#14151C] border border-white/5 hover:border-[#D6F174]/25 cursor-pointer transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-zinc-800 flex-shrink-0">
            <img src="/logo.png" alt="Avatar" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#D6F174] border-2 border-[#14151C] rounded-full" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-white group-hover:text-[#D6F174] truncate block transition-colors">
              Dhuruv
            </span>
            <p className="text-[10px] text-zinc-500 truncate">@dhuruv_vibe</p>
          </div>
        </div>
        <SparklesIcon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#F7C948] transition-colors flex-shrink-0" />
      </div>
    </aside>
  );
};
