import React, { useState, useEffect } from 'react';
import { Post } from '../lib/mockData';
import {
  XIcon,
  ImageIcon,
  GifIcon,
  PollIcon,
  SmileIcon,
  CalendarIcon,
  MapPinIcon,
  VerifiedBadgeIcon,
} from './Icons';
import { useToast } from './ToastContext';

interface CommentModalProps {
  post: Post | null;
  onClose: () => void;
  onAddComment: (postId: string, comment: string) => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  post,
  onClose,
  onAddComment,
}) => {
  const { toast } = useToast();
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (!post) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [post, onClose]);

  if (!post) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reply-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[600px] rounded-none sm:rounded-[20px] bg-[#000000] border border-[#2F3336] shadow-2xl p-4 text-white flex flex-col my-auto max-h-screen sm:max-h-[90vh]"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-2 mb-2">
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors -ml-1.5"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => toast('Drafts saved locally', 'info')}
            className="text-[14px] font-bold text-[#D6F174] hover:underline cursor-pointer"
          >
            Drafts
          </button>
        </div>

        {/* Scrollable Thread Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
          {/* Parent Post Thread Item */}
          <div className="flex gap-3">
            {/* Left Column: Avatar + Thread Connecting Line */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Vertical connecting line */}
              <div className="w-0.5 bg-[#333639] flex-1 my-1.5 min-h-[30px]" />
            </div>

            {/* Right Column: Author, Post Body, Quoted Card & Replying To */}
            <div className="flex-1 min-w-0 pb-3">
              <div className="flex items-center gap-1 leading-tight flex-wrap">
                <span className="font-bold text-[15px] text-white hover:underline cursor-pointer">
                  {post.author.name}
                </span>
                {(post.author.verified || post.author.name.includes('Elon') || post.author.name.includes('Dhuruv')) && (
                  <VerifiedBadgeIcon className="w-4 h-4 ml-0.5 flex-shrink-0" />
                )}
                {post.author.badge && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/10 font-bold ml-1 text-zinc-300">
                    {post.author.badge}
                  </span>
                )}
                <span className="text-[15px] text-zinc-500 ml-1">
                  {post.author.handle}
                </span>
                <span className="text-[15px] text-zinc-500">·</span>
                <span className="text-[15px] text-zinc-500">{post.timestamp}</span>
              </div>

              {/* Title if present */}
              {post.title && (
                <h4 className="font-bold text-[15px] text-white mt-1">
                  {post.title}
                </h4>
              )}

              {/* Content body */}
              <p className="text-[15px] text-white leading-normal mt-1 whitespace-pre-line">
                {post.content}
              </p>

              {/* Quoted Card (e.g. Sundar Pichai quote in screenshot) */}
              {post.quote && (
                <div className="mt-3 rounded-2xl border border-[#2F3336] p-3.5 bg-[#000000] hover:bg-white/[0.02] cursor-pointer transition-colors">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                      <img src={post.quote.author.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-sm text-white">{post.quote.author.name}</span>
                    <VerifiedBadgeIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-xs text-zinc-500">{post.quote.author.handle}</span>
                    <span className="text-xs text-zinc-500">·</span>
                    <span className="text-xs text-zinc-500">{post.quote.timestamp}</span>
                  </div>
                  <p className="text-[14px] text-white leading-relaxed whitespace-pre-line">
                    {post.quote.content}
                  </p>
                </div>
              )}

              {/* Image if present */}
              {post.image && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-[#2F3336] max-h-60">
                  <img src={post.image} alt="Attachment" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Replying to line */}
              <div className="text-[15px] text-zinc-500 mt-3">
                Replying to{' '}
                <span className="text-[#D6F174] hover:underline cursor-pointer">
                  {post.author.handle}
                </span>
              </div>
            </div>
          </div>

          {/* Reply Composer Row */}
          <div className="flex gap-3 pt-1">
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/10">
              <img src="/logo.png" alt="My avatar" className="w-full h-full object-cover" />
            </div>

            {/* Input Form */}
            <div className="flex-1 min-w-0">
              <form onSubmit={handleSubmit}>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Post your reply"
                  rows={3}
                  autoFocus
                  className="w-full bg-transparent text-[18px] text-white placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
                />

                {/* Toolbar Row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#2F3336]/60 mt-2">
                  {/* Media icons toolbar */}
                  <div className="flex items-center gap-4 text-[#D6F174]">
                    <button
                      type="button"
                      onClick={() => toast('Image attachment active', 'info')}
                      title="Media"
                      className="hover:bg-[#D6F174]/15 p-1.5 rounded-full transition-colors"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast('GIF picker', 'info')}
                      title="GIF"
                      className="hover:bg-[#D6F174]/15 p-1.5 rounded-full transition-colors"
                    >
                      <GifIcon className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast('Create a poll', 'info')}
                      title="Poll"
                      className="hover:bg-[#D6F174]/15 p-1.5 rounded-full transition-colors"
                    >
                      <PollIcon className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCommentText((prev) => prev + ' 😊')}
                      title="Emoji"
                      className="hover:bg-[#D6F174]/15 p-1.5 rounded-full transition-colors"
                    >
                      <SmileIcon className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast('Schedule post', 'info')}
                      title="Schedule"
                      className="hover:bg-[#D6F174]/15 p-1.5 rounded-full transition-colors"
                    >
                      <CalendarIcon className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast('Tag location', 'info')}
                      title="Location"
                      className="hover:bg-[#D6F174]/15 p-1.5 rounded-full transition-colors opacity-50 cursor-not-allowed"
                    >
                      <MapPinIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Reply Button */}
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`px-5 py-1.5 rounded-full font-bold text-[15px] transition-all ${
                      commentText.trim()
                        ? 'bg-[#D6F174] text-black hover:bg-[#c6e45f] active:scale-95 shadow-md cursor-pointer'
                        : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
