'use client';

import React, { useEffect, useState } from 'react';
import { Story } from '../lib/mockData';
import { XIcon } from './Icons';

interface StoryViewerModalProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialStoryIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((curr) => curr + 1);
            return 0;
          } else {
            clearInterval(interval);
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, stories.length, onClose]);

  const currentStory = stories[currentIndex];

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((curr) => curr + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((curr) => curr - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, stories.length, onClose]);

  if (!currentStory) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Story Viewer"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm h-[600px] rounded-3xl overflow-hidden bg-[#14151B] border border-white/20 shadow-2xl flex flex-col justify-between"
      >
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentStory.media}
            alt="Story background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        </div>

        {/* Top Progress Bars */}
        <div className="relative z-10 p-4 pt-3 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 w-full">
            {stories.map((s, idx) => (
              <div key={s.id} className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-[#D6F174] shadow-[0_0_8px_#D6F174] transition-all duration-100 ease-linear rounded-full"
                  style={{
                    width:
                      idx < currentIndex
                        ? '100%'
                        : idx === currentIndex
                        ? `${progress}%`
                        : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* User Header & Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[14px] overflow-hidden border-2 border-[#D6F174] shadow-[0_0_12px_rgba(214,241,116,0.4)] flex-shrink-0">
                <img
                  src={currentStory.user.avatar}
                  alt={currentStory.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">
                  {currentStory.user.name}
                </p>
                <p className="text-[11px] text-zinc-300">
                  {currentStory.timeAgo} · Disappearing
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tap Left / Right Handlers */}
        <div className="absolute inset-y-16 inset-x-0 z-10 flex">
          <div className="w-1/2 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-1/2 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* Bottom Caption & Reply Bar */}
        <div className="relative z-10 p-4 pb-5 flex flex-col gap-3">
          <p className="text-sm font-medium text-white drop-shadow-md">
            {currentStory.caption}
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Reply to ${currentStory.user.name}...`}
              className="flex-1 px-4 py-2 text-xs rounded-full bg-black/60 border border-white/20 text-white placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#D6F174]"
            />
            <button className="px-3 py-2 rounded-full bg-[#D6F174] text-black text-xs font-bold hover:brightness-110">
              Send 🔥
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
