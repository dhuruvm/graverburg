import { BellIcon, SparklesIcon, SearchIcon } from './Icons';
import { ActiveTab } from './LeftSidebar';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0D0E12] border-b border-[#22242D] px-4 lg:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Logo (Mobile / Tablet Display) */}
        <div
          onClick={() => setActiveTab('feed')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl overflow-hidden bg-[#1E2028] border border-white/10 group-hover:scale-105 transition-transform flex-shrink-0 shadow-[0_0_12px_rgba(214,241,116,0.25)]">
            <img
              src="/logo.png"
              alt="GraverBurg Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#D6F174] transition-colors">
                GraverBurg
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-black tracking-wider uppercase rounded-full bg-[#D6F174]/15 text-[#D6F174] border border-[#D6F174]/30">
                Gen Z Space
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden sm:block">
              X-posting & chat · Profile is your space
            </p>
          </div>
        </div>

        {/* Center Pill Mode Switcher (For Tablets & Mobile) */}
        <div className="hidden md:flex lg:hidden items-center p-1 rounded-full bg-[#16171E] border border-white/10">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeTab === 'feed'
                ? 'bg-[#F7C948] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-[#F7C948] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-[#F7C948] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Live Chat
          </button>
          <button
            onClick={() => setActiveTab('showcase')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              activeTab === 'showcase'
                ? 'bg-[#D6F174] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Showcase
          </button>
        </div>

        {/* Right Status Capsule & Profile Quick Trigger */}
        <div className="flex items-center gap-3">
          {/* Status Capsule matching UI template header */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7C948]/15 border border-[#F7C948]/30 text-[#F7C948] text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F7C948] animate-pulse" />
            <span>7h 15m remaining</span>
          </div>

          {/* Quick Notification Bell */}
          <div className="relative p-2 rounded-2xl bg-[#16171E] border border-white/10 text-zinc-300 hover:text-white cursor-pointer transition-colors">
            <BellIcon className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FA5D54] rounded-full" />
          </div>

          {/* User Mini Avatar Trigger */}
          <div
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-[#16171E] border border-white/10 cursor-pointer hover:border-[#D6F174]/40 transition-colors"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden bg-zinc-800 border border-white/20 flex-shrink-0">
              <img src="/logo.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-white hidden sm:inline-block">@dhuruv</span>
          </div>
        </div>
      </div>
    </header>
  );
};
