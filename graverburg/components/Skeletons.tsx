import React from 'react';

// ─── Skeleton Primitives ──────────────────────────────────────────────────────

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-[#1E2028] rounded-lg ${className}`}
    aria-hidden="true"
  />
);

// ─── Post Card Skeleton ───────────────────────────────────────────────────────

export const PostCardSkeleton: React.FC = () => (
  <div className="rounded-[24px] p-5 bg-[#14151C] border border-[#1E2028]" aria-hidden="true">
    {/* Author row */}
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-2.5 w-40" />
      </div>
    </div>
    {/* Title */}
    <Skeleton className="h-5 w-3/4 mb-2" />
    {/* Body */}
    <Skeleton className="h-3 w-full mb-1.5" />
    <Skeleton className="h-3 w-5/6 mb-1.5" />
    <Skeleton className="h-3 w-4/6 mb-4" />
    {/* Actions */}
    <div className="flex items-center gap-5 pt-3 border-t border-white/5">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-4 w-8" />
      ))}
    </div>
  </div>
);

// ─── Feed Skeleton (multiple cards) ──────────────────────────────────────────

export const FeedSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <PostCardSkeleton key={i} />
    ))}
  </div>
);

// ─── Story Bar Skeleton ───────────────────────────────────────────────────────

export const StoryBarSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 py-1 mb-4" aria-hidden="true">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0">
        <Skeleton className="w-[52px] h-[52px] rounded-full" />
        <Skeleton className="h-2 w-10" />
      </div>
    ))}
  </div>
);

// ─── Chat List Skeleton ───────────────────────────────────────────────────────

export const ChatListSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <div className="space-y-2 p-2" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3 rounded-2xl">
        <Skeleton className="w-11 h-11 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2.5 w-36" />
        </div>
      </div>
    ))}
  </div>
);

// ─── Profile Banner Skeleton ──────────────────────────────────────────────────

export const ProfileSkeleton: React.FC = () => (
  <div className="w-full max-w-2xl mx-auto pb-10" aria-hidden="true">
    <div className="rounded-[32px] bg-[#14151C] border border-[#1E2028] overflow-hidden mb-6">
      {/* Banner */}
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="px-6 pb-6 -mt-14">
        <div className="flex items-end justify-between mb-4">
          <Skeleton className="w-28 h-28 rounded-3xl border-4 border-[#0D0E12]" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-3 w-64 mb-4" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-6 w-20 rounded-full" />)}
        </div>
      </div>
    </div>
  </div>
);
