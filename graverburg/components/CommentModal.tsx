'use client';

import React, { useState, useEffect } from 'react';
import { Post } from '../lib/mockData';
import { XIcon, SendIcon } from './Icons';

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
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comment-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-[#17181F] border border-white/10 shadow-2xl p-6 text-white flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <h3 id="comment-modal-title" className="font-display font-bold text-lg">Replies & Yap Session</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#D6F174]/20 text-[#D6F174] font-bold">
              {post.comments?.length || 0}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close replies modal"
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#1E202A] border border-white/5 mb-4">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
              <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold text-white">{post.author.name}</span>
              <span className="text-[11px] text-zinc-400 ml-1.5">{post.author.handle}</span>
            </div>
          </div>
          <p className="text-xs text-zinc-200 line-clamp-3">{post.content}</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4 no-scrollbar">
          {(!post.comments || post.comments.length === 0) ? (
            <div className="text-center py-8 text-zinc-400 text-xs">
              No replies yet. Be the first to start the thread! 💬
            </div>
          ) : (
            post.comments.map((c) => (
              <div key={c.id} className="p-3.5 rounded-2xl bg-[#1D1F28] border border-white/5 flex gap-3">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                  <img src={c.avatar} alt={c.author} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{c.author}</span>
                    <span className="text-[10px] text-zinc-400">{c.time}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{c.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-white/10">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Drop your thoughts..."
            className="flex-1 px-4 py-2.5 rounded-full bg-[#121318] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#D6F174]"
          />
          <button
            type="submit"
            className="p-2.5 rounded-full bg-[#D6F174] text-black hover:brightness-110 active:scale-95 transition-all"
          >
            <SendIcon className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
