import React, { useState } from 'react';
import { Post, Story } from '../lib/mockData';
import {
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  ShareIcon,
  BookmarkIcon,
  PlayIcon,
  PauseIcon,
  PlusIcon,
  FlameIcon,
  ImageIcon,
  MusicIcon,
} from './Icons';

interface FeedViewProps {
  posts: Post[];
  stories: Story[];
  onLikePost: (postId: string) => void;
  onRepostPost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
  onOpenComments: (post: Post) => void;
  onOpenStory: (index: number) => void;
  onOpenCreateModal: () => void;
  onSharePost: (post: Post) => void;
  onAddNewPost?: (post: Post) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  posts,
  stories,
  onLikePost,
  onRepostPost,
  onBookmarkPost,
  onOpenComments,
  onOpenStory,
  onOpenCreateModal,
  onSharePost,
  onAddNewPost,
}) => {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following' | 'explore'>('forYou');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Inline Composer State
  const [composerText, setComposerText] = useState('');
  const [composerCategory, setComposerCategory] = useState<'Vibes' | 'Anime' | 'Gamer' | 'Thoughts' | 'Music' | 'Meme'>('Vibes');
  const [composerColor, setComposerColor] = useState<'lime' | 'yellow' | 'coral' | 'cream' | 'dark'>('dark');
  const [composerAudio, setComposerAudio] = useState(false);
  const [composerImage, setComposerImage] = useState<string | null>(null);

  const filterCategories = ['All', 'Vibes', 'Anime', 'Gamer', 'Music', 'Thoughts', 'Meme'];

  // Only show category chips inside Explore tab
  const showCategoryChips = activeTab === 'explore';

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === 'All' || !showCategoryChips) return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const toggleAudio = (postId: string) => {
    setPlayingAudioId(playingAudioId === postId ? null : postId);
  };

  const handleInlinePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Dhuruv',
        handle: '@dhuruv_vibe',
        avatar: '/logo.png',
        badge: 'OG Graver 🔺',
      },
      content: composerText.trim(),
      timestamp: 'Just now',
      category: composerCategory,
      cardColor: composerColor,
      likes: 0,
      reposts: 0,
      replies: 0,
      hasLiked: false,
      image: composerImage || undefined,
      audioSnippet: composerAudio
        ? { track: 'Midnight Beats #04', duration: '0:30' }
        : undefined,
      comments: [],
    };

    onAddNewPost?.(newPost);
    setComposerText('');
    setComposerImage(null);
    setComposerAudio(false);
  };

  // Color dot options with accessible labels
  const colorOptions: { value: 'lime' | 'yellow' | 'coral' | 'cream' | 'dark'; bg: string; label: string }[] = [
    { value: 'dark', bg: 'bg-[#16171E] border border-white/30', label: 'Dark (default)' },
    { value: 'lime', bg: 'bg-[#D6F174]', label: 'Pistachio Lime' },
    { value: 'yellow', bg: 'bg-[#F7C948]', label: 'Honey Yellow' },
    { value: 'coral', bg: 'bg-[#FA5D54]', label: 'Coral Red' },
    { value: 'cream', bg: 'bg-[#ECEEE8]', label: 'Cream' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto pb-28 pt-0">
      {/* Stream Tabs — sticky header */}
      <div className="sticky top-0 z-20 bg-[#0D0E12] border-b border-[#1E2028]">
        <div className="flex items-center px-4 pt-3 pb-2 gap-1">
          {[
            { id: 'forYou' as const, label: 'For You' },
            { id: 'following' as const, label: 'Following' },
            { id: 'explore' as const, label: 'Explore' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedCategory('All'); }}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category chips — only visible inside Explore */}
        {showCategoryChips && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 pb-2.5 pt-1">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#D6F174] text-black font-bold'
                    : 'bg-[#14151C] text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pt-4">
        {/* 24h Stories — compact single-row bar */}
        <div className="mb-4 flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {/* Add Story */}
          <div
            onClick={onOpenCreateModal}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
          >
            <div className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-[#14151C] border-2 border-dashed border-zinc-600 group-hover:border-[#D6F174] flex items-center justify-center transition-all">
              <PlusIcon className="w-4 h-4 text-zinc-500 group-hover:text-[#D6F174]" />
            </div>
            <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300">Add</span>
          </div>

          {/* Story items */}
          {stories.map((story, idx) => (
            <div
              key={story.id}
              onClick={() => onOpenStory(idx)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
            >
              <div
                className={`w-[52px] h-[52px] rounded-full flex-shrink-0 transition-transform group-hover:scale-105 ${
                  story.hasSeen
                    ? 'p-[2.5px] bg-zinc-700'
                    : 'p-[2.5px] bg-gradient-to-tr from-[#FA5D54] via-[#F7C948] to-[#D6F174]'
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0D0E12] bg-zinc-800 flex items-center justify-center">
                  <img
                    src={story.user.avatar}
                    alt={story.user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
              </div>
              <span className="text-[10px] font-medium text-zinc-400 max-w-[52px] truncate text-center">
                {story.user.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Inline Post Composer */}
        <div className="mb-5 p-4 rounded-2xl bg-[#14151C] border border-[#1E2028]">
          <form onSubmit={handleInlinePost}>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-zinc-800">
                <img src="/logo.png" alt="My Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <textarea
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={2}
                  className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none resize-none"
                />

                {/* Image preview */}
                {composerImage && (
                  <div className="relative mb-3 rounded-xl overflow-hidden max-h-40 border border-white/10">
                    <img src={composerImage} alt="Attachment" className="w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setComposerImage(null)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 text-white text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Audio badge */}
                {composerAudio && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#1A1B22] border border-white/10 mb-3 text-xs text-[#D6F174]">
                    <MusicIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Audio snippet attached</span>
                    <button type="button" onClick={() => setComposerAudio(false)} className="ml-auto text-zinc-500 hover:text-white">✕</button>
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    {/* Category */}
                    <select
                      value={composerCategory}
                      onChange={(e) => setComposerCategory(e.target.value as any)}
                      className="h-8 px-2 rounded-lg bg-[#1E2028] text-zinc-300 text-xs font-semibold border border-white/10 focus:outline-none cursor-pointer"
                    >
                      <option value="Vibes">⚡ Vibes</option>
                      <option value="Anime">🍜 Anime</option>
                      <option value="Gamer">🎮 Gamer</option>
                      <option value="Thoughts">💭 Thoughts</option>
                      <option value="Music">🎵 Music</option>
                      <option value="Meme">🐸 Meme</option>
                    </select>

                    {/* Card color — with accessible labels via title */}
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1E2028] border border-white/10 h-8">
                      {colorOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setComposerColor(opt.value)}
                          title={opt.label}
                          aria-label={opt.label}
                          className={`w-4 h-4 rounded-full flex-shrink-0 transition-all ${opt.bg} ${
                            composerColor === opt.value
                              ? 'ring-2 ring-offset-1 ring-offset-[#1E2028] ring-white scale-110'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Attach image */}
                    <button
                      type="button"
                      onClick={() => setComposerImage(composerImage ? null : 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80')}
                      title="Attach Image"
                      className="w-8 h-8 rounded-lg bg-[#1E2028] hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>

                    {/* Attach audio */}
                    <button
                      type="button"
                      onClick={() => setComposerAudio(!composerAudio)}
                      title="Attach Audio Snippet"
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                        composerAudio
                          ? 'bg-[#D6F174] text-black border-transparent'
                          : 'bg-[#1E2028] hover:bg-white/10 text-zinc-400 hover:text-white border-white/10'
                      }`}
                    >
                      <MusicIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!composerText.trim()}
                    className={`h-8 px-4 rounded-lg font-display font-black text-xs transition-all ${
                      composerText.trim()
                        ? 'bg-[#D6F174] hover:bg-[#c6e45f] text-black cursor-pointer'
                        : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Post Cards */}
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            // Resolve card styling
            let cardStyle = 'card-dark';
            let textColor = 'text-zinc-100';
            let subTextColor = 'text-zinc-500';
            let borderStyle = 'border border-[#1E2028]';
            let dividerColor = 'border-white/5';
            let actionColor = 'text-zinc-500 hover:text-zinc-300';

            if (post.cardColor === 'lime') {
              cardStyle = 'card-lime';
              textColor = 'text-[#111827]';
              subTextColor = 'text-[#3D4A1A]';
              borderStyle = '';
              dividerColor = 'border-black/10';
              actionColor = 'text-[#2B3B0B] hover:text-black';
            } else if (post.cardColor === 'yellow') {
              cardStyle = 'card-yellow';
              textColor = 'text-[#111827]';
              subTextColor = 'text-[#4A3810]';
              borderStyle = '';
              dividerColor = 'border-black/10';
              actionColor = 'text-[#4A3810] hover:text-black';
            } else if (post.cardColor === 'coral') {
              cardStyle = 'card-coral';
              textColor = 'text-white';
              subTextColor = 'text-white/70';
              borderStyle = '';
              dividerColor = 'border-white/15';
              actionColor = 'text-white/70 hover:text-white';
            } else if (post.cardColor === 'cream') {
              cardStyle = 'card-cream';
              textColor = 'text-[#111827]';
              subTextColor = 'text-[#4B5563]';
              borderStyle = '';
              dividerColor = 'border-black/10';
              actionColor = 'text-[#4B5563] hover:text-black';
            }

            const isPlaying = playingAudioId === post.id;

            return (
              <article
                key={post.id}
                className={`rounded-[24px] p-5 transition-all duration-200 ${cardStyle} ${borderStyle}`}
              >
                {/* Author row */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-black/20 border border-black/10">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${textColor}`}>{post.author.name}</span>
                      {post.author.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/15 font-semibold">
                          {post.author.badge}
                        </span>
                      )}
                    </div>
                    {/* Single muted metadata line */}
                    <p className={`text-[11px] ${subTextColor}`}>
                      {post.author.handle} · {post.timestamp} · {post.category}
                    </p>
                  </div>
                  {/* Share in the action row — not isolated top-right */}
                </div>

                {/* Title */}
                {post.title && (
                  <h3 className={`font-display font-extrabold text-xl mb-2 tracking-tight leading-snug ${textColor}`}>
                    {post.title}
                  </h3>
                )}

                {/* Body */}
                <p className={`text-sm leading-relaxed mb-4 ${textColor}`}>
                  {post.content}
                </p>

                {/* Post image */}
                {post.image && (
                  <div className="rounded-xl overflow-hidden mb-4 border border-black/10 max-h-72">
                    <img src={post.image} alt="Post visual" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Audio player */}
                {post.audioSnippet && (
                  <div
                    onClick={() => toggleAudio(post.id)}
                    className={`flex items-center justify-between p-3 rounded-xl mb-4 cursor-pointer transition-all ${
                      post.cardColor === 'dark' ? 'bg-[#1F212B]' : 'bg-black/12'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                        {isPlaying ? (
                          <PauseIcon className="w-3.5 h-3.5 text-[#D6F174]" />
                        ) : (
                          <PlayIcon className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <div>
                        <p className={`text-xs font-bold ${textColor}`}>{post.audioSnippet.track}</p>
                        <p className={`text-[10px] ${subTextColor}`}>{post.audioSnippet.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-end gap-0.5 h-5 pr-1">
                      <span className={`w-1 bg-current rounded-full ${isPlaying ? 'soundwave-bar-1' : 'h-1'}`} />
                      <span className={`w-1 bg-current rounded-full ${isPlaying ? 'soundwave-bar-2' : 'h-3'}`} />
                      <span className={`w-1 bg-current rounded-full ${isPlaying ? 'soundwave-bar-3' : 'h-1.5'}`} />
                      <span className={`w-1 bg-current rounded-full ${isPlaying ? 'soundwave-bar-4' : 'h-4'}`} />
                      <span className={`w-1 bg-current rounded-full ${isPlaying ? 'soundwave-bar-5' : 'h-2'}`} />
                    </div>
                  </div>
                )}

                {/* Engagement row — all actions grouped together */}
                <div className={`flex items-center justify-between pt-3 border-t ${dividerColor}`}>
                  <div className="flex items-center gap-4">
                    {/* Like */}
                    <button
                      onClick={() => onLikePost(post.id)}
                      aria-label="Like post"
                      className={`flex items-center gap-1.5 text-xs font-bold transition-all active:scale-125 min-h-[44px] ${
                        post.hasLiked ? 'text-red-500' : actionColor
                      }`}
                    >
                      <HeartIcon className={`w-4 h-4 ${post.hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    {/* Reply */}
                    <button
                      onClick={() => onOpenComments(post)}
                      aria-label="Reply to post"
                      className={`flex items-center gap-1.5 text-xs font-bold min-h-[44px] ${actionColor}`}
                    >
                      <MessageCircleIcon className="w-4 h-4" />
                      <span>{post.replies || post.comments?.length || 0}</span>
                    </button>

                    {/* Repost */}
                    <button
                      onClick={() => onRepostPost(post.id)}
                      aria-label="Repost"
                      className={`flex items-center gap-1.5 text-xs font-bold min-h-[44px] ${
                        post.hasReposted ? 'text-emerald-500' : actionColor
                      }`}
                    >
                      <RepeatIcon className="w-4 h-4" />
                      <span>{post.reposts}</span>
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={() => onBookmarkPost(post.id)}
                      aria-label="Bookmark"
                      className={`flex items-center gap-1.5 text-xs font-bold min-h-[44px] ${
                        post.hasBookmarked ? 'text-[#F7C948]' : actionColor
                      }`}
                    >
                      <BookmarkIcon className={`w-4 h-4 ${post.hasBookmarked ? 'fill-[#F7C948] text-[#F7C948]' : ''}`} />
                    </button>

                    {/* Share */}
                    <button
                      onClick={() => onSharePost(post)}
                      aria-label="Share post"
                      className={`flex items-center gap-1.5 text-xs font-bold min-h-[44px] ${actionColor}`}
                    >
                      <ShareIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* "Reply to thread" — clear CTA */}
                  <button
                    onClick={() => onOpenComments(post)}
                    className="px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/35 font-semibold text-xs tracking-wide transition-all active:scale-95 border border-black/10"
                    style={{ color: 'inherit' }}
                  >
                    Reply
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
