import React, { useState, useEffect } from 'react';
import { UserProfile, Post } from '../lib/mockData';
import {
  ArrowLeftIcon,
  SearchIcon,
  LockIcon,
  BriefcaseIcon,
  CalendarIcon,
  VerifiedBadgeIcon,
  XIcon,
  MusicIcon,
  PlayIcon,
  PauseIcon,
  SparklesIcon,
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
  SendIcon,
} from './Icons';
import { useToast } from './ToastContext';

interface ProfileViewProps {
  user: UserProfile;
  posts: Post[];
  onUpdateUser: (updated: UserProfile) => void;
  onRemixTheme: () => void;
  onBackToFeed?: () => void;
  initialEmpty?: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  posts,
  onUpdateUser,
  onRemixTheme,
  onBackToFeed,
  initialEmpty = false,
}) => {
  const { toast } = useToast();
  const [isEmptyState, setIsEmptyState] = useState(initialEmpty);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showVerifiedCard, setShowVerifiedCard] = useState(true);
  const [activeProfileTab, setActiveProfileTab] = useState<'posts' | 'replies' | 'highlights' | 'articles' | 'media' | 'likes'>('posts');
  const [newQuestion, setNewQuestion] = useState('');
  const [qaSuccess, setQaSuccess] = useState(false);

  // Filter posts for this user (or fallback to top posts)
  const userPosts = posts.filter(
    (p) => p.author.handle === user.handle || p.author.name === user.name || p.author.handle === '@falooda_fr'
  );
  const displayPosts = userPosts.length > 0 ? userPosts : posts.slice(0, 3);

  const tabs: Array<{ id: 'posts' | 'replies' | 'highlights' | 'articles' | 'media' | 'likes'; label: string }> = [
    { id: 'posts', label: 'Posts' },
    { id: 'replies', label: 'Replies' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'articles', label: 'Articles' },
    { id: 'media', label: 'Media' },
    { id: 'likes', label: 'Likes' },
  ];

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const newQA = {
      id: `qa-${Date.now()}`,
      question: newQuestion.trim(),
      date: 'Just now',
    };
    onUpdateUser({
      ...user,
      anonymousQA: [newQA, ...user.anonymousQA],
    });
    setNewQuestion('');
    setQaSuccess(true);
    setTimeout(() => setQaSuccess(false), 3000);
    toast('Anonymous question posted to space! 💬', 'celebrate');
  };

  // ==========================================
  // EMPTY PROFILE STATE (Preserved)
  // ==========================================
  if (isEmptyState) {
    return (
      <div className="w-full max-w-2xl mx-auto pb-28 px-4 pt-2">
        {/* State Toggle Capsule */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#16171E] border border-white/10 mb-6">
          <span className="text-xs font-bold text-zinc-300 ml-2">Preview Mode:</span>
          <div className="flex items-center gap-1.5 bg-[#0D0E12] p-1 rounded-xl">
            <button
              onClick={() => setIsEmptyState(false)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition-colors"
            >
              Customized Space ✨
            </button>
            <button
              onClick={() => setIsEmptyState(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-black bg-[#FA5D54] text-white shadow-sm"
            >
              Empty Profile State 📭
            </button>
          </div>
        </div>

        {/* Empty Profile Showcase with Central GraverBurg Mascot */}
        <div className="rounded-[32px] bg-[#16171E] border border-white/10 p-8 text-center shadow-xl">
          <div className="w-24 h-24 mx-auto mb-5 rounded-3xl overflow-hidden bg-[#1E2028] border-4 border-[#D6F174] shadow-[0_0_30px_rgba(214,241,116,0.3)] flex-shrink-0">
            <img src="/logo.png" alt="GraverBurg Mascot" className="w-full h-full object-cover" />
          </div>

          <h2 className="font-display font-black text-2xl text-white mb-2">
            This Profile is Empty & Waiting For You
          </h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
            Your GraverBurg space is completely customizable. Pick your color theme, link your theme song, pin your Top 4 friends, and invite the world.
          </p>

          <button
            onClick={() => setIsEmptyState(false)}
            className="px-8 py-3.5 rounded-full bg-[#D6F174] hover:bg-[#c9e663] text-black font-display font-black text-sm tracking-wide shadow-[0_0_25px_rgba(214,241,116,0.3)] transition-all transform hover:scale-105 active:scale-95"
          >
            Claim Your Aesthetic & Enter Space ✨
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE VIEW (Matches Screenshot 4)
  // ==========================================
  return (
    <div className="w-full max-w-2xl mx-auto pb-28 pt-0 min-h-screen">
      {/* 1. Sticky Header Bar */}
      <div className="sticky top-0 z-20 bg-[#0D0E12]/95 backdrop-blur-md border-b border-[#1E2028] flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-6">
          <button
            onClick={onBackToFeed}
            aria-label="Back"
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <h2 className="font-bold text-[18px] text-white">Falooda</h2>
              <LockIcon className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <p className="text-[12px] text-zinc-500">{displayPosts.length} post{displayPosts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <button
          onClick={() => toast('Search posts from @falooda_fr', 'info')}
          className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Banner Header */}
      <div className="relative w-full h-48 sm:h-56 bg-[#16171E] overflow-hidden">
        {/* Custom Illustration Banner (Matching Screenshot 4) */}
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        
        {/* Stylized Banner Text like screenshot: FALOODA I MAKE GAMES. BE COLD. */}
        <div className="absolute top-4 left-6 pointer-events-none">
          <span className="font-display font-black text-2xl tracking-tight text-white drop-shadow-md">
            FALOODA
          </span>
          <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest drop-shadow">
            I MAKE GAMES. BE COLD.
          </p>
        </div>
      </div>

      {/* 3. Avatar & Profile Actions Row */}
      <div className="px-4 pb-3">
        <div className="flex items-end justify-between -mt-16 sm:-mt-20 mb-3">
          {/* Circular Overlapping Avatar (Floral Crown looking down) */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#0D0E12] bg-[#16171E] flex-shrink-0 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
              alt="Falooda"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Edit Profile & Space Actions */}
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => onRemixTheme()}
              title="Remix theme"
              className="px-3.5 py-1.5 rounded-full border border-white/20 hover:bg-white/10 text-xs font-bold text-white transition-all flex items-center gap-1.5"
            >
              <SparklesIcon className="w-3.5 h-3.5 text-[#F7C948]" />
              <span>Remix</span>
            </button>
            <button
              onClick={() => toast('Profile editor opened 🎨', 'info')}
              className="px-4 py-1.5 rounded-full border border-[#536471] hover:bg-white/10 text-white font-bold text-sm transition-all"
            >
              Edit profile
            </button>
          </div>
        </div>

        {/* 4. Name, Handle, Bio, Metadata & Stats */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-[20px] text-white">Falooda</h1>
              <LockIcon className="w-4 h-4 text-zinc-400" />
            </div>
            <p className="text-[14px] text-zinc-500">@falooda_fr</p>
          </div>

          <p className="text-[15px] text-white leading-normal">
            Game Designer & Developer
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[14px] text-zinc-500">
            <div className="flex items-center gap-1.5">
              <BriefcaseIcon className="w-4 h-4 text-zinc-400" />
              <span>Game Developer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-zinc-400" />
              <span>Joined October 2025</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[14px] text-zinc-500 pt-0.5">
            <div>
              <strong className="text-white">1</strong> Following
            </div>
            <div>
              <strong className="text-white">0</strong> Followers
            </div>
          </div>
        </div>

        {/* 5. "You aren't verified yet" Green Box (Matches Screenshot 4) */}
        {showVerifiedCard && (
          <div className="rounded-2xl bg-[#0A2619] border border-[#13432B] p-4 my-4 relative">
            <button
              onClick={() => setShowVerifiedCard(false)}
              aria-label="Dismiss"
              className="absolute top-3.5 right-3.5 text-zinc-400 hover:text-white transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 mb-1.5">
              <h3 className="font-bold text-[17px] text-white">
                You aren’t verified yet
              </h3>
              <VerifiedBadgeIcon className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[13px] text-zinc-300 leading-snug mb-3.5 max-w-md">
              Get verified for boosted replies, analytics, ad-free browsing, and more. Upgrade your profile now.
            </p>
            <button
              onClick={() => toast('Verified checkmark activated for your space! 🌟', 'celebrate')}
              className="px-4 py-1.5 rounded-full bg-[#D6F174] hover:bg-[#c6e45f] text-black font-extrabold text-sm shadow-sm active:scale-95 transition-all"
            >
              Get verified
            </button>
          </div>
        )}

        {/* 6. Spotify Live Music Presence Widget (GraverBurg Superpower) */}
        <div className="rounded-2xl bg-[#16171E] border border-white/5 p-3.5 my-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0 relative">
              <img src={user.music.albumArt} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white"
              >
                {isPlayingMusic ? <PauseIcon className="w-4 h-4 text-[#D6F174]" /> : <PlayIcon className="w-4 h-4" />}
              </button>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <MusicIcon className="w-3.5 h-3.5 text-[#1DB954]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1DB954]">Listening on Spotify</span>
              </div>
              <p className="text-xs font-bold text-white truncate">{user.music.track}</p>
              <p className="text-[11px] text-zinc-400 truncate">{user.music.artist}</p>
            </div>
          </div>

          <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-1' : 'h-1'}`} />
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-2' : 'h-3'}`} />
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-3' : 'h-1.5'}`} />
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-4' : 'h-4'}`} />
            <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-5' : 'h-2'}`} />
          </div>
        </div>
      </div>

      {/* 7. Profile Tabs (Posts, Replies, Highlights, Articles, Media, Likes) */}
      <div className="border-t border-[#1E2028]">
        <div className="flex items-center overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeProfileTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveProfileTab(tab.id)}
                className="flex-1 relative py-3 px-4 text-center text-[15px] font-bold whitespace-nowrap transition-colors hover:bg-white/[0.03]"
              >
                <span className={isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-1 bg-[#D6F174] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Tab Stream Content */}
      <div className="divide-y divide-[#1E2028]">
        {/* Posts Tab */}
        {activeProfileTab === 'posts' && (
          <div>
            {displayPosts.map((post) => (
              <article
                key={post.id}
                className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img src={post.author.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[15px] text-white">Falooda</span>
                      <LockIcon className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-zinc-500 text-sm ml-1">@falooda_fr · Jun 6</span>
                    </div>
                  </div>
                </div>

                <p className="text-[15px] text-white leading-normal pl-11 whitespace-pre-line mb-3">
                  {post.content}
                </p>

                {/* Engagement row */}
                <div className="flex items-center justify-between text-zinc-500 text-xs pl-11 max-w-md pt-1">
                  <div className="flex items-center gap-1.5 hover:text-[#D6F174]">
                    <MessageCircleIcon className="w-4 h-4" />
                    <span>{post.replies}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-emerald-400">
                    <RepeatIcon className="w-4 h-4" />
                    <span>{post.reposts}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-red-500">
                    <HeartIcon className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-[#D6F174]">
                    <ShareIcon className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Media Tab */}
        {activeProfileTab === 'media' && (
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {user.photoWall.map((photo, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-zinc-800 border border-white/10 group">
                <img src={photo} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        )}

        {/* Anonymous Q&A or other tabs */}
        {(activeProfileTab === 'replies' || activeProfileTab === 'highlights' || activeProfileTab === 'articles' || activeProfileTab === 'likes') && (
          <div className="p-8 text-center text-zinc-500 text-sm">
            <p>No {activeProfileTab} yet. Keep expressing yourself on GraverBurg!</p>
          </div>
        )}
      </div>

      {/* 9. Top 4 Friends & Anonymous Q&A Shelf (GraverBurg bedroom aesthetic) */}
      <div className="px-4 pt-6 space-y-4">
        {/* Top 4 Friends */}
        <div className="p-4 rounded-2xl bg-[#16171E] border border-white/5">
          <h3 className="font-display font-extrabold text-sm text-white mb-3">
            Top 4 Besties · Space Orbit 🪐
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {user.topFriends.map((f, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center group cursor-pointer hover:border-[#D6F174]/40 transition-colors">
                <div className="w-12 h-12 mx-auto rounded-full overflow-hidden border border-white/10 mb-1.5">
                  <img src={f.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold text-white truncate">{f.name}</p>
                <p className="text-[10px] text-zinc-400 truncate">{f.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Anonymous Q&A Box */}
        <div className="p-4 rounded-2xl bg-[#16171E] border border-white/5">
          <h3 className="font-display font-extrabold text-sm text-white mb-1">
            Anonymous Q&A (Ask Falooda anything) 💬
          </h3>
          <p className="text-xs text-zinc-400 mb-3">Questions drop straight to this space.</p>
          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask anonymously..."
              className="flex-1 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D6F174]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#D6F174] text-black font-bold text-xs hover:bg-[#c6e45f] transition-colors"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
