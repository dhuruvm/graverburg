'use client';

import React, { useState, useEffect } from 'react';
import { XIcon, ImageIcon, MusicIcon } from './Icons';
import { Post } from '../lib/mockData';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: Post) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Vibes' | 'Anime' | 'Gamer' | 'Thoughts' | 'Music' | 'Meme'>('Vibes');
  const [cardColor, setCardColor] = useState<'lime' | 'yellow' | 'coral' | 'dark' | 'cream'>('lime');
  const [withAudio, setWithAudio] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories: Array<'Vibes' | 'Anime' | 'Gamer' | 'Thoughts' | 'Music' | 'Meme'> = [
    'Vibes',
    'Anime',
    'Gamer',
    'Thoughts',
    'Music',
    'Meme',
  ];

  const colors: Array<{ label: string; value: 'lime' | 'yellow' | 'coral' | 'dark' | 'cream'; bg: string }> = [
    { label: 'Pistachio Lime', value: 'lime', bg: '#D6F174' },
    { label: 'Honey Yellow', value: 'yellow', bg: '#F7C948' },
    { label: 'Coral Red', value: 'coral', bg: '#FA5D54' },
    { label: 'Cream White', value: 'cream', bg: '#ECEEE8' },
    { label: 'Dark Slate', value: 'dark', bg: '#1E2028' },
  ];

  const sampleImages = [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Dhuruv',
        handle: '@dhuruv_vibe',
        avatar: '/logo.png',
        badge: 'OG Graver 🔺',
      },
      title: title.trim() || undefined,
      content: content.trim(),
      timestamp: 'Just now',
      category,
      cardColor,
      likes: 1,
      reposts: 0,
      replies: 0,
      hasLiked: true,
      image: selectedImage || undefined,
      audioSnippet: withAudio
        ? {
            track: 'Lofi Ambient Drop #26',
            duration: '0:28',
          }
        : undefined,
      comments: [],
    };

    onAddPost(newPost);
    setTitle('');
    setContent('');
    setSelectedImage(null);
    setWithAudio(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-post-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md my-auto rounded-[32px] bg-[#FA5D54] text-white p-7 shadow-2xl border border-white/20 transition-all duration-300"
      >
        <button
          onClick={onClose}
          aria-label="Close composer modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">
            GraverBurg Composer
          </p>
          <h2 id="create-post-modal-title" className="font-display text-2xl font-black tracking-tight text-white">
            Create new vibe post
          </h2>
          <p className="text-xs text-white/80 mt-1">
            Share short thoughts, memes, audio snippets, or ideas to the feed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-1.5">
              Vibe Title / Hook
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. February Dribbble Shot Design"
              className="w-full px-4 py-3 rounded-2xl bg-black/15 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-1.5">
              Your Message (X-Style Short Post)
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What are you creating, listening to, or thinking right now? #vibes"
              className="w-full px-4 py-3 rounded-2xl bg-black/15 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-2">
              Select Vibe Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    category === cat
                      ? 'bg-black text-white shadow-md scale-105'
                      : 'bg-black/20 text-white/80 hover:bg-black/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-2">
              Card Color Accent (UI Template)
            </label>
            <div className="flex items-center gap-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCardColor(c.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    cardColor === c.value
                      ? 'border-black scale-110 shadow-md ring-2 ring-white/50'
                      : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.bg }}
                  title={c.label}
                />
              ))}
              <span className="text-xs font-medium text-white/80 ml-2">
                {colors.find((c) => c.value === cardColor)?.label}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-2">
              Tagged Friends & Vibe Tribe
            </label>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FA5D54] flex-shrink-0">
                  <img src="/logo.png" alt="You" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FA5D54] flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Kira" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FA5D54] flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" alt="Ren" className="w-full h-full object-cover" />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWithAudio(!withAudio)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                  withAudio
                    ? 'bg-black text-white border-black'
                    : 'bg-black/15 text-white/90 border-white/20 hover:bg-black/25'
                }`}
              >
                <MusicIcon className="w-3.5 h-3.5" />
                {withAudio ? 'Audio Added 🎵' : '+ Add Audio Snippet'}
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/90">
                Attach Visual Aesthetic
              </label>
              {selectedImage && (
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="text-[11px] underline text-white/80"
                >
                  Remove Image
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {sampleImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(selectedImage === img ? null : img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 ${
                    selectedImage === img
                      ? 'border-black scale-105 ring-2 ring-white'
                      : 'border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Sample" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-4 rounded-2xl bg-black text-white font-display font-extrabold text-sm tracking-wide hover:bg-zinc-900 active:scale-95 transition-all duration-200 shadow-xl flex items-center justify-center gap-2"
          >
            POST TO GRAVERBURG 🔺
          </button>
        </form>
      </div>
    </div>
  );
};
