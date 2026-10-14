import React from 'react';
import { HomeIcon, MessageCircleIcon, PlusIcon, UserIcon, BellIcon } from './Icons';

interface FloatingDockProps {
  activeTab: 'feed' | 'profile' | 'chat' | 'showcase';
  setActiveTab: (tab: 'feed' | 'profile' | 'chat' | 'showcase') => void;
  openCreateModal: () => void;
  unreadCount?: number;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeTab,
  setActiveTab,
  openCreateModal,
  unreadCount = 2,
}) => {
  const navItems = [
    {
      id: 'feed' as const,
      icon: <HomeIcon className="w-5 h-5" />,
      label: 'Home',
    },
    {
      id: 'chat' as const,
      icon: (
        <div className="relative">
          <MessageCircleIcon className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FA5D54] text-white text-[9px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      ),
      label: 'Messages',
    },
    {
      id: 'profile' as const,
      icon: <UserIcon className="w-5 h-5" />,
      label: 'My Space',
    },
    {
      id: null,
      icon: <BellIcon className="w-5 h-5" />,
      label: 'Alerts',
      badge: '3',
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden select-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Pill container */}
      <div className="flex items-center justify-around bg-[#14151C] border-t border-[#1E2028] shadow-[0_-8px_32px_rgba(0,0,0,0.6)] px-2 py-2">

        {/* Left nav items */}
        {navItems.slice(0, 2).map((item, i) => {
          const isActive = item.id !== null && activeTab === item.id;
          return (
            <button
              key={i}
              onClick={() => item.id && setActiveTab(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`touch-target flex-col gap-0.5 rounded-xl transition-all duration-200 ${
                isActive ? 'text-[#D6F174]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.icon}
              <span className="text-[9px] font-semibold">{item.label}</span>
            </button>
          );
        })}

        {/* Center Create Button */}
        <button
          onClick={openCreateModal}
          aria-label="Create new post"
          className="touch-target w-12 h-12 rounded-2xl bg-[#D6F174] text-[#0D0E12] hover:bg-[#c9e663] active:scale-95 transition-all shadow-[0_0_20px_rgba(214,241,116,0.35)] flex-shrink-0"
        >
          <PlusIcon className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Right nav items */}
        {navItems.slice(2).map((item, i) => {
          const isActive = item.id !== null && activeTab === item.id;
          return (
            <button
              key={i}
              onClick={() => item.id && setActiveTab(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`touch-target flex-col gap-0.5 rounded-xl transition-all duration-200 ${
                isActive ? 'text-[#D6F174]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.icon}
              <span className="text-[9px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
