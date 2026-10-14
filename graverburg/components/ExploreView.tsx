import React, { useState } from 'react';
import { SearchIcon, SettingsIcon, MoreHorizontalIcon, FlameIcon, SparklesIcon } from './Icons';
import { useToast } from './ToastContext';

interface ExploreViewProps {
  onSelectTopic?: (tag: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onSelectTopic }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'explore' | 'trending' | 'news' | 'sports' | 'entertainment'>('explore');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: Array<{ id: 'explore' | 'trending' | 'news' | 'sports' | 'entertainment'; label: string }> = [
    { id: 'explore', label: 'Explore' },
    { id: 'trending', label: 'Trending' },
    { id: 'news', label: 'News' },
    { id: 'sports', label: 'Sports' },
    { id: 'entertainment', label: 'Entertainment' },
  ];

  const todayNews = [
    {
      id: 'news-1',
      title: 'Modi Tells Global Leaders India Grows With the World Through Shared Empowerment',
      category: 'News',
      timeAgo: '4 hours ago',
      postsCount: '2.7K posts',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-2',
      title: 'Ramayana Trailer 2 Launch Set for Bengaluru with Yash and Cast',
      category: 'Entertainment',
      timeAgo: '14 hours ago',
      postsCount: '5.8K posts',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-3',
      title: "Mumbai Indians Eye Rohit Sharma's Return as Captain for 2027 IPL",
      category: 'Sports',
      timeAgo: '14 hours ago',
      postsCount: '12K posts',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'news-4',
      title: 'Vijay Deverakonda Joins Leaders for Ranabaali History Chat',
      category: 'Entertainment',
      timeAgo: 'Trending now',
      postsCount: '1,706 posts',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const trendingList = [
    { category: 'Technology · Trending', tag: 'Gemini 4 Argon', count: '94.2K posts' },
    { category: 'Design · Trending', tag: '#CyberAesthetic', count: '28.4K posts' },
    { category: 'Gen Z Culture · Trending', tag: '#GraverBurgSpace', count: '18.1K posts' },
    { category: 'Music · Trending', tag: '#LofiDrop26', count: '14.9K posts' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto pb-28 pt-0">
      {/* Sticky Search & Tabs Header */}
      <div className="sticky top-0 z-20 bg-[#0D0E12]/95 backdrop-blur-md border-b border-[#1E2028]">
        {/* Top Search Bar */}
        <div className="flex items-center gap-3 px-4 pt-3 pb-2">
          <div className="flex-1 flex items-center rounded-full bg-[#16171E] border border-white/5 focus-within:border-[#D6F174]/50 focus-within:bg-black px-4 py-2 transition-all">
            <SearchIcon className="w-4 h-4 text-zinc-500 mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search GraverBurg or topics"
              className="bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
            />
          </div>
          <button
            onClick={() => toast('Explore settings and content preferences', 'info')}
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors flex-shrink-0"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center overflow-x-auto no-scrollbar px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-5 py-3 text-[15px] font-bold text-center whitespace-nowrap transition-colors hover:bg-white/[0.03]"
              >
                <span className={isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-5 right-5 h-1 bg-[#D6F174] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Stream */}
      <div>
        {/* Hero Spotlight Card (Matching UNIQLO x Bumrah structure) */}
        <div
          onClick={() => toast('Opening featured campaign: UNIQLO x Bumrah', 'info')}
          className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden cursor-pointer group"
        >
          <img
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&auto=format&fit=crop&q=80"
            alt="UNIQLO x Bumrah"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Top-Right Badge & Menu */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] font-black uppercase tracking-wider text-[#D6F174] border border-white/10">
              Spotlight
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toast('Spotlight options', 'info');
              }}
              className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white"
            >
              <MoreHorizontalIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Captions */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 drop-shadow">
              Fleece Jacket
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight leading-tight mt-0.5">
              UNIQLO x Bumrah
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 mt-1 line-clamp-1 font-medium">
              A UNIQLO fleece for everything Jasprit loves doing
            </p>
            <span className="inline-block text-[11px] text-zinc-400 mt-1 font-semibold">
              Promoted · Curated for GraverBurg Space 🔺
            </span>
          </div>
        </div>

        {/* Section: Today's News */}
        <div className="border-t border-[#1E2028] bg-[#0D0E12]">
          <div className="px-4 pt-4 pb-2">
            <h3 className="font-display font-black text-xl text-white tracking-tight flex items-center gap-2">
              <FlameIcon className="w-5 h-5 text-[#FA5D54]" />
              Today’s News
            </h3>
          </div>

          <div className="divide-y divide-[#1E2028]">
            {todayNews.map((news) => (
              <div
                key={news.id}
                onClick={() => toast(`Opening news: ${news.title}`, 'info')}
                className="px-4 py-3.5 hover:bg-white/[0.03] cursor-pointer transition-colors flex items-start justify-between gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[15px] text-white group-hover:text-[#D6F174] transition-colors leading-snug mb-1.5">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                    <span className="truncate">{news.timeAgo} · {news.category} · {news.postsCount}</span>
                  </div>
                </div>

                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10 mt-0.5">
                  <img src={news.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Trending Topics */}
        <div className="border-t border-[#1E2028] bg-[#0D0E12] pt-4">
          <div className="px-4 pb-2">
            <h3 className="font-display font-black text-xl text-white tracking-tight flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-[#F7C948]" />
              Trending in Space
            </h3>
          </div>

          <div className="divide-y divide-[#1E2028]">
            {trendingList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectTopic?.(item.tag);
                  toast(`Filtering feed for ${item.tag}`, 'info');
                }}
                className="px-4 py-3.5 hover:bg-white/[0.03] cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div>
                  <p className="text-[12px] text-zinc-500 font-medium">{item.category}</p>
                  <p className="text-[16px] font-bold text-white group-hover:text-[#D6F174] transition-colors mt-0.5">
                    {item.tag}
                  </p>
                  <p className="text-[12px] text-zinc-500 mt-0.5">{item.count}</p>
                </div>
                <MoreHorizontalIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
