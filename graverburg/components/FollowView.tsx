import React, { useState } from 'react';
import { ArrowLeftIcon, SettingsIcon, VerifiedBadgeIcon } from './Icons';
import { useToast } from './ToastContext';

interface FollowViewProps {
  onBackToFeed?: () => void;
}

export const FollowView: React.FC<FollowViewProps> = ({ onBackToFeed }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'whoToFollow' | 'creators'>('whoToFollow');
  const [followedState, setFollowedState] = useState<Record<string, boolean>>({});
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

  const suggestedUsers = [
    {
      id: 'modi',
      name: 'Narendra Modi',
      handle: '@narendramodi',
      verified: true,
      bio: 'Prime Minister of India',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80',
      followingCount: '2.4K',
      followersCount: '98.5M',
    },
    {
      id: 'pmo',
      name: 'PMO India',
      handle: '@PMOIndia',
      verified: true,
      bio: 'Office of the Prime Minister of India',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      followingCount: '543',
      followersCount: '58.3M',
    },
    {
      id: 'president',
      name: 'President of India',
      handle: '@rashtrapatibhvn',
      verified: true,
      bio: "Official X account of Rashtrapati Bhavan and is run by the President's Secretariat | Smt Droupadi Murmu, President of India.",
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      followingCount: '12',
      followersCount: '14.2M',
    },
    {
      id: 'rajini',
      name: 'Rajinikanth',
      handle: '@rajinikanth',
      verified: true,
      bio: 'Actor · Film icon · Cinema legend',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      followingCount: '28',
      followersCount: '6.4M',
    },
    {
      id: 'isro',
      name: 'ISRO',
      handle: '@isro',
      verified: true,
      bio: 'Indian Space Research Organisation | Official handle',
      avatar: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=120&auto=format&fit=crop&q=80',
      followingCount: '31',
      followersCount: '4.9M',
    },
    {
      id: 'trump',
      name: 'Donald J. Trump',
      handle: '@realDonaldTrump',
      verified: true,
      bio: '45th & 47th President of the United States of America 🇺🇸',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      followingCount: '51',
      followersCount: '90.1M',
    },
    {
      id: 'cnn',
      name: 'CNN Breaking News',
      handle: '@cnnbrk',
      verified: true,
      bio: 'Precise, real-time alerts on global news from CNN.',
      avatar: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=120&auto=format&fit=crop&q=80',
      followingCount: '120',
      followersCount: '64.8M',
    },
  ];

  const toggleFollow = (id: string, name: string) => {
    const next = !followedState[id];
    setFollowedState((prev) => ({ ...prev, [id]: next }));
    if (next) {
      toast(`You followed ${name}! 🎉`, 'celebrate');
    } else {
      toast(`Unfollowed ${name}`, 'info');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-28 pt-0 min-h-screen">
      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-20 bg-[#0D0E12]/95 backdrop-blur-md border-b border-[#1E2028]">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-6">
            <button
              onClick={onBackToFeed}
              aria-label="Back"
              className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h2 className="font-display font-black text-xl text-white tracking-tight">
              Follow
            </h2>
          </div>
          <button
            onClick={() => toast('Follow recommendations settings', 'info')}
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs: Who to follow / Creators for you */}
        <div className="flex border-t border-[#1E2028]">
          <button
            onClick={() => setActiveTab('whoToFollow')}
            className="flex-1 relative py-3 text-center text-[15px] font-bold transition-colors hover:bg-white/[0.03]"
          >
            <span className={activeTab === 'whoToFollow' ? 'text-white' : 'text-zinc-500'}>
              Who to follow
            </span>
            {activeTab === 'whoToFollow' && (
              <span className="absolute bottom-0 left-10 right-10 h-1 bg-[#D6F174] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('creators')}
            className="flex-1 relative py-3 text-center text-[15px] font-bold transition-colors hover:bg-white/[0.03]"
          >
            <span className={activeTab === 'creators' ? 'text-white' : 'text-zinc-500'}>
              Creators for you
            </span>
            {activeTab === 'creators' && (
              <span className="absolute bottom-0 left-10 right-10 h-1 bg-[#D6F174] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Suggested for you Section */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-display font-extrabold text-[19px] text-white">
          Suggested for you
        </h3>
      </div>

      <div className="divide-y divide-[#1E2028]">
        {suggestedUsers.map((u) => {
          const isFollowed = followedState[u.id];
          const isHovered = hoveredUserId === u.id;

          return (
            <div
              key={u.id}
              className="px-4 py-3.5 hover:bg-white/[0.03] transition-colors flex items-start justify-between gap-3 relative group"
            >
              {/* User Avatar + Details */}
              <div
                className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
                onMouseEnter={() => setHoveredUserId(u.id)}
                onMouseLeave={() => setHoveredUserId(null)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10 mt-0.5">
                  <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 leading-tight">
                    <span className="font-bold text-[15px] text-white group-hover:underline truncate">
                      {u.name}
                    </span>
                    {u.verified && <VerifiedBadgeIcon className="w-4 h-4 flex-shrink-0" />}
                  </div>
                  <p className="text-[13px] text-zinc-500 truncate">{u.handle}</p>
                  <p className="text-[13px] text-zinc-300 leading-snug mt-1.5 line-clamp-2">
                    {u.bio}
                  </p>
                </div>

                {/* Popover Card (Matches PMO India popover in Screenshot 3) */}
                {isHovered && u.id === 'pmo' && (
                  <div className="absolute top-12 left-12 z-30 w-72 rounded-2xl bg-[#16171E] border border-[#2A2D37] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] pointer-events-none">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10">
                        <img src={u.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-[#D6F174] text-black font-extrabold text-xs">
                        {isFollowed ? 'Following' : 'Follow'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-base text-white">{u.name}</span>
                      <VerifiedBadgeIcon className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">{u.handle}</p>
                    <p className="text-xs text-zinc-200 leading-relaxed mb-3">{u.bio}</p>
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span><strong className="text-white">{u.followingCount}</strong> Following</span>
                      <span><strong className="text-white">{u.followersCount}</strong> Followers</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Follow Button */}
              <button
                onClick={() => toggleFollow(u.id, u.name)}
                className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all flex-shrink-0 min-w-[84px] active:scale-95 ${
                  isFollowed
                    ? 'bg-transparent text-zinc-300 border border-[#536471] hover:border-red-500 hover:text-red-500 hover:bg-red-500/10'
                    : 'bg-[#D6F174] text-black hover:bg-[#c6e45f] font-extrabold shadow-sm'
                }`}
              >
                {isFollowed ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
