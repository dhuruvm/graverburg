import React, { useState, useCallback, useEffect } from 'react';
import { UserProfile, Post } from '../lib/mockData';
import {
  MusicIcon,
  PlayIcon,
  PauseIcon,
  SparklesIcon,
  SettingsIcon,
  SendIcon,
  RepeatIcon,
  FlameIcon,
  GridIcon,
  CheckIcon,
  ShareIcon,
  HeartIcon,
  MessageCircleIcon,
  BookmarkIcon,
} from './Icons';
import { useToast } from './ToastContext';

interface ProfileViewProps {
  user: UserProfile;
  posts: Post[];
  onUpdateUser: (updated: UserProfile) => void;
  onRemixTheme: () => void;
  initialEmpty?: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  posts,
  onUpdateUser,
  onRemixTheme,
  initialEmpty = false,
}) => {
  const { toast } = useToast();
  const [isEmptyState, setIsEmptyState] = useState(initialEmpty);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [qaSuccessMessage, setQaSuccessMessage] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'posts' | 'photos' | 'qa'>('posts');
  const [showThemeModal, setShowThemeModal] = useState(false);

  useEffect(() => {
    if (!showThemeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowThemeModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showThemeModal]);

  // Themes palette definitions (Strictly adhering to Dribbble UI colors, zero glassmorphism)
  const themes: Array<{
    id: 'lime' | 'yellow' | 'coral' | 'dark' | 'synthwave';
    name: string;
    accent: string;
    bannerBg: string;
    badgeBg: string;
    borderAccent: string;
  }> = [
    {
      id: 'lime',
      name: 'Pistachio Lime',
      accent: '#D6F174',
      bannerBg: 'bg-gradient-to-r from-[#17200B] via-[#243310] to-[#17200B]',
      badgeBg: 'bg-[#D6F174] text-black',
      borderAccent: 'border-[#D6F174]',
    },
    {
      id: 'yellow',
      name: 'Honey Yellow',
      accent: '#F7C948',
      bannerBg: 'bg-gradient-to-r from-[#241C0A] via-[#362A0D] to-[#241C0A]',
      badgeBg: 'bg-[#F7C948] text-black',
      borderAccent: 'border-[#F7C948]',
    },
    {
      id: 'coral',
      name: 'Coral Tangerine',
      accent: '#FA5D54',
      bannerBg: 'bg-gradient-to-r from-[#29100F] via-[#3D1716] to-[#29100F]',
      badgeBg: 'bg-[#FA5D54] text-white',
      borderAccent: 'border-[#FA5D54]',
    },
    {
      id: 'dark',
      name: 'Deep Midnight Slate',
      accent: '#E4E4E7',
      bannerBg: 'bg-gradient-to-r from-[#121318] via-[#1C1E26] to-[#121318]',
      badgeBg: 'bg-zinc-800 text-white',
      borderAccent: 'border-zinc-500',
    },
    {
      id: 'synthwave',
      name: 'Cyber Neon',
      accent: '#38BDF8',
      bannerBg: 'bg-gradient-to-r from-[#0C1A29] via-[#10273F] to-[#0C1A29]',
      badgeBg: 'bg-[#38BDF8] text-black',
      borderAccent: 'border-[#38BDF8]',
    },
  ];

  const currentTheme = themes.find((t) => t.id === user.theme) || themes[0];

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
    setQaSuccessMessage(true);
    setTimeout(() => setQaSuccessMessage(false), 3000);
  };

  // Filter posts created by this user
  const userPosts = posts.filter(
    (p) => p.author.handle === user.handle || p.author.name === user.name
  );

  // ==========================================
  // EMPTY PROFILE STATE (Requested specifically by user)
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
          {/* Central GraverBurg Mascot Avatar */}
          <div className="w-24 h-24 mx-auto mb-5 rounded-3xl overflow-hidden bg-[#1E2028] border-4 border-[#D6F174] shadow-[0_0_30px_rgba(214,241,116,0.3)] flex-shrink-0">
            <img
              src="/logo.png"
              alt="GraverBurg Mascot"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D6F174]/15 text-[#D6F174] border border-[#D6F174]/30 mb-2">
            Brand New Graver Space
          </span>

          <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight mb-2">
            This Profile is Empty & Waiting For You
          </h2>

          <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
            On GraverBurg, your profile is your own personal space—a custom bedroom on the internet. No aesthetic has been claimed yet. Start building your universe!
          </p>

          {/* Setup Starter Quests (Discord/Social Onboarding) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto mb-8">
            <div
              onClick={() => {
                setIsEmptyState(false);
                setShowThemeModal(true);
              }}
              className="p-4 rounded-2xl bg-[#1C1E26] border border-white/5 hover:border-[#D6F174]/50 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-base">🎨</span>
                <span className="text-xs font-bold text-white">1. Pick Theme Palette</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Pistachio Lime, Honey Yellow, Coral Red, or Midnight Slate.
              </p>
            </div>

            <div
              onClick={() => setIsEmptyState(false)}
              className="p-4 rounded-2xl bg-[#1C1E26] border border-white/5 hover:border-[#F7C948]/50 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-base">🎵</span>
                <span className="text-xs font-bold text-white">2. Pin Your Theme Song</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Set Spotify Now Playing & soundwave equalizer.
              </p>
            </div>

            <div
              onClick={() => setIsEmptyState(false)}
              className="p-4 rounded-2xl bg-[#1C1E26] border border-white/5 hover:border-[#FA5D54]/50 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-base">👥</span>
                <span className="text-xs font-bold text-white">3. Add Top 4 Friends</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Curate your MySpace-style top besties shelf.
              </p>
            </div>

            <div
              onClick={() => setIsEmptyState(false)}
              className="p-4 rounded-2xl bg-[#1C1E26] border border-white/5 hover:border-[#38BDF8]/50 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <span className="text-base">💬</span>
                <span className="text-xs font-bold text-white">4. Anonymous Q&A Box</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Let visitors ask you anything secretly.
              </p>
            </div>
          </div>

          {/* Claim Space CTA */}
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
  // DISCORD + X ADVANCED PROFILE VIEW
  // ==========================================
  return (
    <div className="w-full max-w-3xl mx-auto pb-28 px-3 sm:px-4 pt-1">
      {/* State Toggle Capsule */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-[#16171E] border border-white/10 mb-4">
        <div className="flex items-center gap-2 ml-2">
          <span className="w-2 h-2 rounded-full bg-[#D6F174]" />
          <span className="text-xs font-bold text-zinc-300">Space Active: {currentTheme.name}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0D0E12] p-1 rounded-xl">
          <button
            onClick={() => setIsEmptyState(false)}
            className="px-3 py-1 rounded-lg text-xs font-black bg-[#D6F174] text-black shadow-sm"
          >
            Customized Space ✨
          </button>
          <button
            onClick={() => setIsEmptyState(true)}
            className="px-3 py-1 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition-colors"
          >
            Empty Profile State 📭
          </button>
        </div>
      </div>

      {/* Main Profile Card (Discord Hero Layout) */}
      <div className="rounded-[32px] bg-[#16171E] border border-white/10 shadow-2xl overflow-hidden mb-6">
        {/* 1. Discord Themed Banner Header */}
        <div className={`relative h-44 sm:h-52 w-full ${currentTheme.bannerBg} border-b border-white/10 p-4 flex items-start justify-between`}>
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Visitor Counter Chip */}
          <div className="relative z-10 px-3 py-1 rounded-full bg-[#0D0E12]/90 border border-white/10 text-[11px] font-mono font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D6F174] animate-pulse" />
            <span>{user.visitorCount.toLocaleString()} visits</span>
          </div>

          {/* Quick Theme Remix Action on Banner */}
          <button
            onClick={() => setShowThemeModal(true)}
            className="relative z-10 px-3.5 py-1.5 rounded-full bg-[#0D0E12]/90 hover:bg-[#0D0E12] border border-white/10 text-xs font-bold text-white flex items-center gap-2 transition-all hover:scale-105"
          >
            <SparklesIcon className="w-3.5 h-3.5 text-[#F7C948]" />
            <span>Remix Aesthetic</span>
          </button>
        </div>

        {/* 2. Overlapping Avatar & Action Buttons Bar */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-4 gap-4">
            {/* Discord Overlapping Avatar with Presence */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-[#16171E] bg-[#1C1E26] flex-shrink-0 shadow-2xl">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              {/* Online Presence Indicator */}
              <div
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#D6F174] border-4 border-[#16171E]"
                title="Online on GraverBurg"
              />
            </div>

            {/* Profile Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onRemixTheme()}
                className="px-4 py-2 rounded-2xl bg-[#22242E] hover:bg-[#2c2f3d] text-white text-xs font-bold border border-white/10 transition-all flex items-center gap-1.5"
              >
                <span>Cycle Theme</span>
                <span className="text-[10px]">🎨</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast('Profile link copied!', 'success');
                }}
                aria-label="Copy profile link"
                className="p-2 rounded-2xl bg-[#22242E] hover:bg-[#2c2f3d] text-white border border-white/10 transition-all touch-target"
              >
                <ShareIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsEmptyState(true)}
                className="px-4 py-2 rounded-2xl bg-[#FA5D54] hover:bg-[#f84a40] text-white text-xs font-bold transition-all shadow-sm"
              >
                Show Empty Mode 📭
              </button>
            </div>
          </div>

          {/* 3. Name, Handle, Pronouns & Badges Shelf */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                {user.name}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D6F174]/15 text-[#D6F174] border border-[#D6F174]/30">
                OG Graver 🔺
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mb-3">
              <span className="text-zinc-300 font-bold">{user.handle}</span>
              <span>·</span>
              <span>he/him</span>
              <span>·</span>
              <span className="text-zinc-400">Joined Oct 2026</span>
            </div>

            {/* Status Capsule (Discord Custom Status) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#1C1E26] border border-white/5 text-xs text-zinc-300 mb-4">
              <span>{user.mood}</span>
            </div>

            {/* Discord Badges Shelf */}
            <ul
              className="flex flex-wrap items-center gap-1.5"
              aria-label="Profile badges"
              role="list"
            >
              {user.badges.map((badge, i) => (
                <li
                  key={i}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#1C1E26] border border-white/5 text-zinc-300 flex items-center gap-1"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Bio & About Me */}
          <div className="p-4 rounded-2xl bg-[#1C1E26] border border-white/5 mb-6 text-sm text-zinc-300 leading-relaxed font-normal">
            {user.bio}
          </div>

          {/* 5. Discord Spotify / Now Playing Widget */}
          <div className="p-4 rounded-2xl bg-[#14151B] border border-white/10 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1DB954]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#1DB954]">
                  Listening to Spotify
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">Live Track</span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10 group">
                <img
                  src={user.music.albumArt}
                  alt={user.music.track}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                  aria-label={isPlayingMusic ? 'Pause track' : 'Play track'}
                  aria-pressed={isPlayingMusic}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-white"
                >
                  {isPlayingMusic ? (
                    <PauseIcon className="w-5 h-5 text-[#D6F174]" />
                  ) : (
                    <PlayIcon className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{user.music.track}</h4>
                <p className="text-xs text-zinc-400 truncate">{user.music.artist}</p>

                {/* Scrubber progress */}
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full bg-[#1DB954] transition-all duration-300 ${
                      isPlayingMusic ? 'w-2/3' : 'w-1/4'
                    }`}
                  />
                </div>
              </div>

              {/* Dynamic Soundwave Equalizer */}
              <div className="flex items-end gap-1 h-6 pr-1">
                <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-1' : 'h-1.5'}`} />
                <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-2' : 'h-3'}`} />
                <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-3' : 'h-2'}`} />
                <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-4' : 'h-5'}`} />
                <span className={`w-1 bg-[#D6F174] rounded-full ${isPlayingMusic ? 'soundwave-bar-5' : 'h-2'}`} />
              </div>
            </div>
          </div>

          {/* 6. Top 4 Friends Shelf (MySpace revival) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-display font-extrabold text-sm text-white flex items-center gap-2">
                <span>Top 4 Friends</span>
                <span className="text-[10px] font-mono text-[#F7C948] bg-[#F7C948]/15 px-2 py-0.5 rounded-full">
                  Inner Circle
                </span>
              </h3>
              <span className="text-[11px] text-zinc-400">4 of 4</span>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="list" aria-label="Top friends">
              {user.topFriends.map((friend, i) => (
                <li key={i}>
                  <button
                    className="w-full p-3 rounded-2xl bg-[#1C1E26] border border-white/5 hover:border-white/20 transition-all flex flex-col items-center text-center group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D6F174]"
                    aria-label={`View ${friend.name}'s profile`}
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 mb-2 bg-zinc-800">
                      <img src={friend.avatar} alt={`${friend.name}'s avatar`} className="w-full h-full object-cover" />
                      <span aria-hidden="true" className="absolute bottom-0 right-0 w-3 h-3 bg-[#D6F174] border-2 border-[#1C1E26] rounded-full" />
                      <span className="sr-only">Online</span>
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-[#D6F174] transition-colors truncate max-w-full">
                      {friend.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 truncate max-w-full">
                      {friend.status}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Anonymous Q&A Box (NGL-Style) */}
          <div className="p-4 rounded-2xl bg-[#1C1E26] border border-white/5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>💬</span>
                <span>Send Dhuruv an Anonymous Question</span>
              </span>
              <span className="text-[10px] text-[#FA5D54] font-bold uppercase">100% Anonymous</span>
            </div>

            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Ask anything... honestly!"
                className="flex-1 px-3 py-2 rounded-xl bg-[#14151B] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FA5D54]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#FA5D54] hover:bg-[#e64c43] text-white text-xs font-bold transition-colors"
              >
                Send 🚀
              </button>
            </form>

            {qaSuccessMessage && (
              <p className="text-[11px] text-[#D6F174] font-bold mt-2">
                ✓ Anonymous question dropped into Dhuruv&apos;s vault!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 8. X/Twitter-Style Content Tabs ([Posts] | [Photos] | [Q&A Vault]) */}
      <div className="rounded-[32px] bg-[#16171E] border border-white/10 overflow-hidden shadow-xl p-5">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
          <button
            onClick={() => setActiveProfileTab('posts')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeProfileTab === 'posts'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Vibes & Posts ({userPosts.length})
          </button>
          <button
            onClick={() => setActiveProfileTab('photos')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeProfileTab === 'photos'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Photo Wall ({user.photoWall.length})
          </button>
          <button
            onClick={() => setActiveProfileTab('qa')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeProfileTab === 'qa'
                ? 'bg-[#FA5D54] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Answered Q&A ({user.anonymousQA.length})
          </button>
        </div>

        {/* Tab 1: Posts Stream */}
        {activeProfileTab === 'posts' && (
          <div className="space-y-4">
            {userPosts.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6">
                No vibes posted yet. Write your first post using the composer!
              </p>
            ) : (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl bg-[#1C1E26] border border-white/5 text-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-zinc-300">{post.timestamp}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10">
                      {post.category}
                    </span>
                  </div>
                  {post.title && <h4 className="font-bold text-sm mb-1">{post.title}</h4>}
                  <p className="text-xs text-zinc-300 leading-relaxed mb-3">{post.content}</p>
                  {post.image && (
                    <div className="rounded-xl overflow-hidden mb-3 max-h-60 border border-white/10">
                      <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-zinc-400 pt-2 border-t border-white/5">
                    <span>❤️ {post.likes} likes</span>
                    <span>💬 {post.replies} replies</span>
                    <span>🔁 {post.reposts} reposts</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Photo Wall Grid */}
        {activeProfileTab === 'photos' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {user.photoWall.map((photo, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-800 group relative"
              >
                <img
                  src={photo}
                  alt={`Memory ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Answered Q&A */}
        {activeProfileTab === 'qa' && (
          <div className="space-y-3">
            {user.anonymousQA.map((qa) => (
              <div
                key={qa.id}
                className="p-4 rounded-2xl bg-[#1C1E26] border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#FA5D54]">
                    Anonymous Graver asked:
                  </span>
                  <span className="text-[10px] text-zinc-500">{qa.date}</span>
                </div>
                <p className="text-xs text-white font-medium mb-3">
                  &ldquo;{qa.question}&rdquo;
                </p>
                <div className="p-2.5 rounded-xl bg-[#14151B] border border-white/5 text-xs text-zinc-300">
                  <span className="font-bold text-[#D6F174] mr-1.5">Dhuruv:</span>
                  {qa.answer || 'Still formulating a deeply philosophical reply ☕'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Theme Picker Modal */}
      {showThemeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-modal-title"
          onClick={() => setShowThemeModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-[#16171E] border border-white/20 p-6 text-white shadow-2xl"
          >
            <h3 id="theme-modal-title" className="font-display font-black text-lg mb-1">Pick Aesthetic Theme</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Select your space palette. Changes colors across your profile room.
            </p>

            <div className="space-y-2 mb-5">
              {themes.map((th) => (
                <button
                  key={th.id}
                  onClick={() => {
                    onUpdateUser({ ...user, theme: th.id });
                    setShowThemeModal(false);
                  }}
                  className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    user.theme === th.id
                      ? `${th.borderAccent} bg-[#1F212B]`
                      : 'border-white/10 hover:border-white/20 bg-[#14151B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: th.accent }}
                    />
                    <span className="text-xs font-bold">{th.name}</span>
                  </div>
                  {user.theme === th.id && (
                    <span className="text-xs font-bold text-[#D6F174]">✓ Active</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowThemeModal(false)}
              className="w-full py-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
