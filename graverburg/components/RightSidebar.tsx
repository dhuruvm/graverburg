import React, { useState } from 'react';
import { SearchIcon, XIcon, MoreHorizontalIcon, VerifiedBadgeIcon } from './Icons';
import { useToast } from './ToastContext';

interface RightSidebarProps {
  onSelectTopic?: (tag: string) => void;
  openCreateModal?: () => void;
  onNavigateTab?: (tab: 'feed' | 'explore' | 'notifications' | 'follow' | 'chat' | 'profile' | 'showcase') => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  onSelectTopic,
  onNavigateTab,
}) => {
  const { toast } = useToast();
  const [isNewsDismissed, setIsNewsDismissed] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const newsItems = [
    {
      id: 'news-1',
      title: 'Modi Tells Global Leaders India Grows With the World Through Shared Empowerment',
      meta: '4 hours ago · News · 2,665 posts',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-2',
      title: 'Ramayana Trailer 2 Launch Set for Bengaluru with Yash and Cast',
      meta: '14 hours ago · Entertainment · 5,669 posts',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=80&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-3',
      title: 'Vijay Deverakonda Joins Leaders for Ranabaali History Chat',
      meta: 'Trending now · Entertainment · 1,706 posts',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80',
    },
  ];

  const trendingTopics = [
    {
      category: 'Trending in India · Promoted',
      tag: 'UNIQLO x Bumrah',
      description: 'A UNIQLO fleece for everything Jasprit loves doing',
      posts: null,
      promoted: true,
    },
    {
      category: 'Entertainment · Trending',
      tag: '#CyberAesthetic',
      description: null,
      posts: '28.4k posts',
      promoted: false,
    },
    {
      category: 'Technology · Trending',
      tag: 'Gemini 4 Argon',
      description: null,
      posts: '94.2k posts',
      promoted: false,
    },
    {
      category: 'Sports · Trending',
      tag: '#IndVsAus',
      description: null,
      posts: '45.1k posts',
      promoted: false,
    },
    {
      category: 'Trending now',
      tag: '#GraverBurgSpace',
      description: null,
      posts: '12.8k posts',
      promoted: false,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    onSelectTopic?.(searchValue.trim());
    toast(`Searching for "${searchValue.trim()}"...`, 'info');
  };

  return (
    <aside className="hidden xl:flex flex-col w-80 xl:w-[350px] min-h-screen sticky top-0 border-l border-[#1E2028] bg-[#0D0E12] flex-shrink-0 z-30 select-none overflow-y-auto no-scrollbar px-4 py-2 space-y-4">
      {/* 1. Search Bar */}
      <div className="sticky top-0 bg-[#0D0E12]/95 backdrop-blur-md pt-1 pb-2 z-20">
        <form onSubmit={handleSearchSubmit}>
          <div className="flex items-center rounded-full bg-[#202327] hover:bg-[#272c30] focus-within:bg-[#000000] focus-within:ring-1 focus-within:ring-[#D6F174] px-4 py-2.5 transition-all">
            <SearchIcon className="w-4 h-4 text-zinc-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              className="bg-transparent text-[15px] text-white placeholder-zinc-500 focus:outline-none w-full font-normal"
            />
          </div>
        </form>
      </div>

      {/* 2. Subscribe to Premium Card */}
      <div className="rounded-2xl bg-[#16181C] border border-[#2F3336]/60 p-4">
        <h2 className="text-[20px] font-extrabold text-white tracking-tight leading-tight">
          Subscribe to Premium
        </h2>
        <p className="text-[14px] text-zinc-300 leading-snug mt-1.5 mb-3.5">
          Get rid of ads, see your analytics, boost your replies and unlock 20+ features.
        </p>
        <button
          onClick={() => toast('Subscribed to GraverBurg Premium! 🎉', 'celebrate')}
          className="px-5 py-2 rounded-full bg-[#D6F174] hover:bg-[#c6e45f] text-black font-bold text-[15px] active:scale-95 transition-all shadow-sm"
        >
          Subscribe
        </button>
      </div>

      {/* 3. Today's News Card */}
      {!isNewsDismissed && (
        <div className="rounded-2xl bg-[#16181C] border border-[#2F3336]/60 overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <h2 className="text-[20px] font-extrabold text-white tracking-tight">
              Today’s News
            </h2>
            <button
              onClick={() => setIsNewsDismissed(true)}
              title="Dismiss news"
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-[#2F3336]/40">
            {newsItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toast(`Opening: ${item.title.substring(0, 40)}...`, 'info')}
                className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors group"
              >
                <h3 className="text-[15px] font-bold text-white group-hover:underline leading-snug mb-1.5">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-[13px] text-zinc-500">
                  <div className="w-4 h-4 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="truncate">{item.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. What's happening Card */}
      <div className="rounded-2xl bg-[#16181C] border border-[#2F3336]/60 overflow-hidden">
        <h2 className="text-[20px] font-extrabold text-white tracking-tight px-4 pt-3 pb-2">
          What’s happening
        </h2>

        <div className="divide-y divide-[#2F3336]/40">
          {trendingTopics.map((topic, i) => (
            <div
              key={i}
              onClick={() => {
                onSelectTopic?.(topic.tag);
                toast(`Filtering feed for ${topic.tag}`, 'info');
              }}
              className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between text-[13px] text-zinc-500 mb-0.5">
                <span>{topic.category}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast(`Topic options for ${topic.tag}`, 'info');
                  }}
                  className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                >
                  <MoreHorizontalIcon className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[15px] font-bold text-white group-hover:underline leading-snug">
                {topic.tag}
              </p>

              {topic.description && (
                <p className="text-[13px] text-zinc-400 mt-0.5 leading-snug">
                  {topic.description}
                </p>
              )}

              {topic.posts && (
                <p className="text-[13px] text-zinc-500 mt-0.5">{topic.posts}</p>
              )}
            </div>
          ))}
        </div>

        <div
          onClick={() => {
            if (onNavigateTab) {
              onNavigateTab('explore');
            } else {
              toast('Exploring all trending stories...', 'info');
            }
          }}
          className="p-4 hover:bg-white/[0.03] cursor-pointer text-[#D6F174] text-[15px] font-bold transition-colors"
        >
          Show more
        </div>
      </div>

      {/* 5. Who to follow Card */}
      <div className="rounded-2xl bg-[#16181C] border border-[#2F3336]/60 overflow-hidden">
        <h2 className="text-[20px] font-extrabold text-white tracking-tight px-4 pt-3 pb-2">
          Who to follow
        </h2>

        <div className="divide-y divide-[#2F3336]/40">
          <div className="px-4 py-3 hover:bg-white/[0.03] transition-colors flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80"
                  alt="Narendra Modi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[15px] text-white truncate hover:underline cursor-pointer">
                    Narendra Modi
                  </span>
                  <VerifiedBadgeIcon className="w-4 h-4 flex-shrink-0" />
                </div>
                <p className="text-[13px] text-zinc-500 truncate">@narendramodi</p>
              </div>
            </div>
            <button
              onClick={() => toast('Followed Narendra Modi! 🇮🇳', 'celebrate')}
              className="px-4 py-1.5 rounded-full bg-[#D6F174] hover:bg-[#c6e45f] text-black font-extrabold text-sm active:scale-95 transition-all shadow-sm flex-shrink-0"
            >
              Follow
            </button>
          </div>

          <div className="px-4 py-3 hover:bg-white/[0.03] transition-colors flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="PMO India"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[15px] text-white truncate hover:underline cursor-pointer">
                    PMO India
                  </span>
                  <VerifiedBadgeIcon className="w-4 h-4 flex-shrink-0" />
                </div>
                <p className="text-[13px] text-zinc-500 truncate">@PMOIndia</p>
              </div>
            </div>
            <button
              onClick={() => toast('Followed PMO India! 🇮🇳', 'celebrate')}
              className="px-4 py-1.5 rounded-full bg-[#D6F174] hover:bg-[#c6e45f] text-black font-extrabold text-sm active:scale-95 transition-all shadow-sm flex-shrink-0"
            >
              Follow
            </button>
          </div>
        </div>

        <div
          onClick={() => {
            if (onNavigateTab) {
              onNavigateTab('follow');
            } else {
              toast('Opening follow suggestions...', 'info');
            }
          }}
          className="p-4 hover:bg-white/[0.03] cursor-pointer text-[#D6F174] text-[15px] font-bold transition-colors"
        >
          Show more
        </div>
      </div>

      {/* 5. Legal / Footer links */}
      <div className="px-4 text-[13px] text-zinc-500 leading-relaxed pb-6">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-1">
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Cookie Policy</span>
          <span className="hover:underline cursor-pointer">Accessibility</span>
          <span className="hover:underline cursor-pointer">Ads info</span>
          <span className="hover:underline cursor-pointer">More ···</span>
        </div>
        <p>© 2026 GraverBurg Corp.</p>
      </div>
    </aside>
  );
};
