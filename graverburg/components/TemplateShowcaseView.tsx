'use client';

import React, { useState } from 'react';
import {
  ShareIcon,
  HomeIcon,
  SearchIcon,
  BellIcon,
  SettingsIcon,
  PlusIcon,
  PlayIcon,
  PauseIcon,
} from './Icons';

interface TemplateShowcaseViewProps {
  onOpenCreate: () => void;
}

export const TemplateShowcaseView: React.FC<TemplateShowcaseViewProps> = ({
  onOpenCreate,
}) => {
  const [activeScreenTab, setActiveScreenTab] = useState<'all' | 'screen1' | 'screen2' | 'screen3'>('all');

  return (
    <div className="max-w-6xl mx-auto pb-28 px-4 pt-2">
      {/* Intro Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#D6F174]/15 text-[#D6F174] border border-[#D6F174]/30 mb-2">
          UI Template Match · Dribbble Inspiration
        </span>
        <h1 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight mb-2">
          3-Screen Mobile Template Design
        </h1>
        <p className="text-xs md:text-sm text-zinc-400 max-w-xl mx-auto">
          Faithfully constructed following the provided UI template: dark charcoal base, pill badges, vibrant pistachio lime, honey yellow, and coral red cards with a floating dock.
        </p>

        {/* View Mode Filters */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setActiveScreenTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeScreenTab === 'all'
                ? 'bg-[#F7C948] text-black shadow-md'
                : 'bg-[#181920] text-zinc-400 hover:text-white'
            }`}
          >
            All 3 Screens Side-by-Side
          </button>
          <button
            onClick={() => setActiveScreenTab('screen1')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeScreenTab === 'screen1'
                ? 'bg-[#D6F174] text-black shadow-md'
                : 'bg-[#181920] text-zinc-400 hover:text-white'
            }`}
          >
            Screen 1: Feed & Dock
          </button>
          <button
            onClick={() => setActiveScreenTab('screen2')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeScreenTab === 'screen2'
                ? 'bg-[#F7C948] text-black shadow-md'
                : 'bg-[#181920] text-zinc-400 hover:text-white'
            }`}
          >
            Screen 2: Detail View
          </button>
          <button
            onClick={() => setActiveScreenTab('screen3')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeScreenTab === 'screen3'
                ? 'bg-[#FA5D54] text-white shadow-md'
                : 'bg-[#181920] text-zinc-400 hover:text-white'
            }`}
          >
            Screen 3: Create Sheet
          </button>
        </div>
      </div>

      {/* 3 Mobile Mockups Container */}
      <div className="flex flex-wrap items-start justify-center gap-8">
        {/* SCREEN 1: Manage Your Task / Space Feed with Floating Dock */}
        {(activeScreenTab === 'all' || activeScreenTab === 'screen1') && (
          <div className="w-[340px] h-[690px] rounded-[44px] bg-[#111216] border-[6px] border-[#22242D] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-5 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20" />

            <div>
              {/* Header: Status Pill + User Avatar */}
              <div className="flex items-center justify-between mb-4 pt-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7C948] text-black text-[11px] font-bold shadow-sm">
                  <span>●</span>
                  <span>7h 15m remaining</span>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-zinc-800 flex-shrink-0">
                  <img src="/logo.png" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Title & Pill Filters */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display font-extrabold text-lg text-white">
                    Manage Your Task
                  </h2>
                  <span className="text-[10px] text-zinc-400 font-bold">see all</span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <span className="px-3 py-1 rounded-full bg-[#20222A] text-[10px] font-semibold text-zinc-300">
                    Projects
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#20222A] text-[10px] font-semibold text-zinc-300">
                    Tasks
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F7C948] text-[10px] font-bold text-black">
                    All in Task
                  </span>
                </div>
              </div>

              {/* Stacked Colorful Cards from Template */}
              <div className="space-y-3">
                {/* Lime Green Card */}
                <div className="rounded-[24px] p-4 bg-[#D6F174] text-[#111827] relative shadow-sm">
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <h3 className="font-display font-extrabold text-sm leading-tight">
                        February Dribbble Shot Design
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-[#2A3B0A] font-medium mt-1">
                        <span>🕒 24 Feb</span>
                        <span>● 8:15 pm</span>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center flex-shrink-0">
                      <ShareIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-black/10">
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 rounded-full bg-black/30 border border-white flex items-center justify-center text-[8px] text-white font-bold">A</div>
                      <div className="w-5 h-5 rounded-full bg-black/40 border border-white flex items-center justify-center text-[8px] text-white font-bold">B</div>
                      <div className="w-5 h-5 rounded-full bg-black/50 border border-white flex items-center justify-center text-[8px] text-white font-bold">C</div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-black text-white">
                      JOIN VIBE
                    </span>
                  </div>
                </div>

                {/* Yellow Amber Card */}
                <div className="rounded-[24px] p-4 bg-[#F7C948] text-[#111827] relative shadow-sm">
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <h3 className="font-display font-extrabold text-sm leading-tight">
                        February Dribbble Shot Design
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] text-[#402F02] font-medium mt-1">
                        <span>🕒 24 Feb</span>
                        <span>● 8:15 pm</span>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center flex-shrink-0">
                      <ShareIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-black/10">
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 rounded-full bg-black/30 border border-white flex items-center justify-center text-[8px] text-white font-bold">D</div>
                      <div className="w-5 h-5 rounded-full bg-black/40 border border-white flex items-center justify-center text-[8px] text-white font-bold">E</div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-black text-white">
                      JOIN VIBE
                    </span>
                  </div>
                </div>

                {/* Soft White / Cream Card */}
                <div className="rounded-[24px] p-4 bg-[#ECEEE8] text-[#111827] relative shadow-sm">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-display font-extrabold text-sm leading-tight">
                        February Dribbble Shot Design
                      </h3>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0">
                      <ShareIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Pill Dock from Screen 1 */}
            <div className="w-full flex items-center justify-around py-2.5 px-3 rounded-full bg-[#1C1E26] border border-white/10 shadow-xl">
              <div className="w-8 h-8 rounded-full bg-[#F7C948] flex items-center justify-center text-black shadow-sm">
                <HomeIcon className="w-4 h-4" />
              </div>
              <div className="text-zinc-400">
                <SearchIcon className="w-4 h-4" />
              </div>
              <div className="text-zinc-400">
                <BellIcon className="w-4 h-4" />
              </div>
              <div className="text-zinc-400">
                <SettingsIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: Detail View with Stack of Segmented Colors */}
        {(activeScreenTab === 'all' || activeScreenTab === 'screen2') && (
          <div className="w-[340px] h-[690px] rounded-[44px] bg-[#111216] border-[6px] border-[#22242D] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between p-5 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20" />

            <div>
              <div className="flex items-center justify-between mb-4 pt-4">
                <div className="w-8 h-8 rounded-full bg-[#20222A] flex items-center justify-center text-white text-xs">
                  ←
                </div>
                <div className="px-3 py-1 rounded-full bg-[#F7C948] text-black text-[11px] font-bold">
                  ● 7h 15m
                </div>
              </div>

              <div className="p-4 rounded-[24px] bg-[#1A1C24] border border-white/10 text-white mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-extrabold text-sm">
                    February Dribbble Shot Design
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <ShareIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug mb-3">
                  Created one shot dribbble manage your tasks and social spaces.
                </p>

                <div className="flex items-center gap-3 text-[10px] text-zinc-400 mb-3">
                  <span>🕒 24 Feb</span>
                  <span>● 8:15 pm</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-[#D6F174] text-black text-[9px] font-bold flex items-center justify-center">1</div>
                    <div className="w-5 h-5 rounded-full bg-[#F7C948] text-black text-[9px] font-bold flex items-center justify-center">2</div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[9px] font-bold text-white">
                    DETAILS
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-[20px] bg-[#D6F174] text-[#111827] flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs">February Dribbble Shot Design</h4>
                    <span className="text-[9px] text-[#2F3F0B]">24 Feb · 8:15 pm</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center">
                    <ShareIcon className="w-3 h-3" />
                  </div>
                </div>

                <div className="p-3.5 rounded-[20px] bg-[#F7C948] text-[#111827] flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs">February Dribbble Shot Design</h4>
                    <span className="text-[9px] text-[#3F2F02]">24 Feb · 8:15 pm</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center">
                    <ShareIcon className="w-3 h-3" />
                  </div>
                </div>

                <div className="p-3.5 rounded-[20px] bg-[#FA5D54] text-white flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs">February Dribbble Shot Design</h4>
                    <span className="text-[9px] text-white/80">24 Feb · 8:15 pm</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                    <ShareIcon className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full py-2 px-3 rounded-full bg-[#1C1E26] text-center text-[10px] text-zinc-400 font-bold border border-white/5">
              GRAVERBURG INTERFACE · 2026
            </div>
          </div>
        )}

        {/* SCREEN 3: Help Create new task / Full Coral Red Sheet */}
        {(activeScreenTab === 'all' || activeScreenTab === 'screen3') && (
          <div className="w-[340px] h-[690px] rounded-[44px] bg-[#FA5D54] text-white border-[6px] border-[#FA5D54] shadow-[0_25px_60px_rgba(250,93,84,0.4)] overflow-hidden flex flex-col justify-between p-6 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/30 rounded-full z-20" />

            <div>
              <div className="pt-4 mb-4">
                <h2 className="font-display font-black text-xl text-white">
                  Help Create new task
                </h2>
                <p className="text-[11px] text-white/80 mt-0.5">
                  Set details and assign vibe tribe
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                    Task Title
                  </span>
                  <div className="w-full pb-1.5 border-b border-white/40 text-xs font-semibold text-white">
                    February Dribbble Shot Design
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                    Task Details
                  </span>
                  <div className="w-full pb-1.5 border-b border-white/40 text-xs text-white/90">
                    Created one shot dribbble manage your tasks and social spaces.
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block mb-1.5">
                    Pick Label
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black/20 text-white">
                      Work
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black text-white shadow-sm">
                      Urgent
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black/20 text-white">
                      Social
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block mb-1.5">
                    Assign To
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 text-[10px] font-bold">
                      <div className="w-4 h-4 rounded-full bg-white text-black text-[8px] flex items-center justify-center">D</div>
                      <span>@dhuruv</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 text-[10px] font-bold">
                      <div className="w-4 h-4 rounded-full bg-[#D6F174] text-black text-[8px] flex items-center justify-center">K</div>
                      <span>@kira</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block mb-1.5">
                    Attachments
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-black/20 border border-white/20 flex items-center justify-center text-xs">
                      📄
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-black/20 border border-white/20 flex items-center justify-center text-xs">
                      🎨
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenCreate}
              className="w-full py-3.5 rounded-full bg-black text-white font-display font-extrabold text-xs tracking-wider uppercase hover:bg-zinc-900 active:scale-95 transition-all shadow-xl"
            >
              CREATE TASK / POST 🔺
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
