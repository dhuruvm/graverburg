import React, { useState } from 'react';
import { SearchIcon, FlameIcon, SparklesIcon, MusicIcon, PlayIcon, PauseIcon } from './Icons';

interface RightSidebarProps {
  onSelectTopic?: (tag: string) => void;
  openCreateModal?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  onSelectTopic,
}) => {
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const [followedUsers, setFollowedUsers] = useState<Record<string, boolean>>({});

  const trendingTopics = [
    { tag: '#CyberAesthetic', category: 'Aesthetic · Trending', posts: '28.4k posts', rank: 1, hot: true },
    { tag: '#LofiDrop26', category: 'Music · Room', posts: '14.2k posts', rank: 2, hot: false },
    { tag: '#PistachioLime', category: 'Themes', posts: '9.8k posts', rank: 3, hot: false },
    { tag: '#AnimeNightshift', category: 'Anime · Feed', posts: '31.1k posts', rank: 4, hot: false },
    { tag: '#MySpaceRevival', category: 'Culture · Gen Z', posts: '18.7k posts', rank: 5, hot: false },
  ];

  const suggestedGravers = [
    {
      id: 'sg-1',
      name: 'Aria Vibe',
      handle: '@aria_indie',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      tag: 'Sound Designer 🎧',
    },
    {
      id: 'sg-2',
      name: 'Ren',
      handle: '@ren_val',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      tag: 'Pro Esports 🎮',
    },
    {
      id: 'sg-3',
      name: 'Kira',
      handle: '@kira_cyber',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      tag: 'UI/UX Visuals 🎨',
    },
  ];

  const toggleFollow = (id: string) => {
    setFollowedUsers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="hidden xl:flex flex-col w-72 h-screen sticky top-0 border-l border-[#1E2028] bg-[#0D0E12] flex-shrink-0 z-30 select-none overflow-hidden">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search GraverBurg..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14151C] border border-white/5 focus:border-[#D6F174]/40 focus:outline-none text-sm text-white placeholder-zinc-500 transition-all font-medium"
          />
        </div>

        {/* Trending Topics */}
        <div className="p-4 rounded-2xl bg-[#14151C] border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-extrabold text-sm text-white flex items-center gap-2">
              <FlameIcon className="w-4 h-4 text-[#FA5D54]" />
              Trending
            </h3>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Live</span>
          </div>

          <div className="space-y-3.5">
            {trendingTopics.map((topic) => (
              <div
                key={topic.rank}
                onClick={() => onSelectTopic?.(topic.tag)}
                className="group cursor-pointer flex items-start justify-between"
              >
                <div className="min-w-0">
                  <p className="text-[11px] text-zinc-500 font-medium mb-0.5">{topic.category}</p>
                  <p className="text-sm font-bold text-zinc-100 group-hover:text-[#D6F174] transition-colors truncate">
                    {topic.tag}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{topic.posts}</p>
                </div>
                {topic.hot && (
                  <span className="ml-2 flex-shrink-0 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FA5D54]/15 text-[#FA5D54] border border-[#FA5D54]/20 mt-1">
                    Hot
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Who to Follow */}
        <div className="p-4 rounded-2xl bg-[#14151C] border border-white/5">
          <h3 className="font-display font-extrabold text-sm text-white mb-3 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-[#F7C948]" />
            Suggested Gravers
          </h3>

          <div className="space-y-3">
            {suggestedGravers.map((u) => {
              const isFollowed = followedUsers[u.id];
              return (
                <div key={u.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-zinc-800">
                      <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-zinc-100 truncate">{u.name}</p>
                      <p className="text-[11px] text-zinc-500 truncate">{u.tag}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFollow(u.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 min-h-[32px] min-w-[68px] ${
                      isFollowed
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                        : 'bg-white text-black hover:bg-[#D6F174]'
                    }`}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-1 text-[10px] text-zinc-600 leading-relaxed">
          <p>© 2026 GraverBurg · <span className="hover:text-zinc-400 cursor-pointer">Privacy</span> · <span className="hover:text-zinc-400 cursor-pointer">Terms</span> · <span className="hover:text-zinc-400 cursor-pointer">Guidelines</span></p>
        </div>
      </div>

      {/* Graver Lounge Radio — docked mini-player at the bottom */}
      <div className="flex-shrink-0 border-t border-[#1E2028] bg-[#0D0E12] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10 relative">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80"
              alt="Radio Cover"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsPlayingRadio(!isPlayingRadio)}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
              aria-label={isPlayingRadio ? 'Pause radio' : 'Play radio'}
            >
              {isPlayingRadio ? (
                <PauseIcon className="w-4 h-4 text-[#D6F174]" />
              ) : (
                <PlayIcon className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FA5D54] animate-ping flex-shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FA5D54]">Live Radio</span>
            </div>
            <p className="text-xs font-bold text-zinc-200 truncate">Glue Song (Lofi Flip)</p>
            <p className="text-[10px] text-zinc-500 truncate">beabadoobee · 1.4k listening</p>
          </div>

          {/* Equalizer bars */}
          <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingRadio ? 'soundwave-bar-1' : 'h-1'}`} />
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingRadio ? 'soundwave-bar-2' : 'h-2'}`} />
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingRadio ? 'soundwave-bar-3' : 'h-1.5'}`} />
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingRadio ? 'soundwave-bar-4' : 'h-3'}`} />
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingRadio ? 'soundwave-bar-5' : 'h-1'}`} />
          </div>
        </div>
      </div>
    </aside>
  );
};
