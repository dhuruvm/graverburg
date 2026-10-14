import React, { useState } from 'react';
import {
  SettingsIcon,
  HeartIcon,
  MessageCircleIcon,
  RepeatIcon,
  UserPlusIcon,
  XIcon,
  MoreHorizontalIcon,
  SparklesIcon,
} from './Icons';
import { useToast } from './ToastContext';

export const NotificationsView: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'mentions'>('all');
  const [showPushBanner, setShowPushBanner] = useState(true);

  const notifications = [
    {
      id: 'notif-1',
      type: 'anniversary',
      icon: '🎉',
      content: "It's your GraverBurg anniversary! Celebrate with a special post created just for you",
      time: 'Oct 10',
      action: 'celebrate',
    },
    {
      id: 'notif-2',
      type: 'like',
      icon: <HeartIcon className="w-6 h-6 text-[#FA5D54] fill-[#FA5D54]" />,
      avatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      ],
      userNames: 'Aria Vibe and Kira',
      content: 'liked your post "Built out the full card palette today — pistachio lime, honey yellow..."',
      time: '2h ago',
    },
    {
      id: 'notif-3',
      type: 'mention',
      icon: <MessageCircleIcon className="w-6 h-6 text-[#D6F174] fill-[#D6F174]" />,
      avatars: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'],
      userNames: 'Ren [Gamer]',
      content: 'replied: "Need this as a Discord theme immediately lol"',
      time: '4h ago',
    },
    {
      id: 'notif-4',
      type: 'follow',
      icon: <UserPlusIcon className="w-6 h-6 text-[#D6F174]" />,
      avatars: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'],
      userNames: 'Zane Neo',
      content: 'started following your space aesthetic',
      time: '1d ago',
    },
    {
      id: 'notif-5',
      type: 'repost',
      icon: <RepeatIcon className="w-6 h-6 text-emerald-400" />,
      avatars: ['https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'],
      userNames: 'Elon Musk',
      content: 'reposted your post to 184M followers',
      time: '2d ago',
    },
  ];

  const filteredNotifications =
    activeTab === 'all'
      ? notifications
      : notifications.filter((n) => n.type === 'mention');

  return (
    <div className="w-full max-w-2xl mx-auto pb-28 pt-0 min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[#0D0E12]/95 backdrop-blur-md border-b border-[#1E2028]">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <h2 className="font-display font-black text-xl text-white tracking-tight">
            Notifications
          </h2>
          <button
            onClick={() => toast('Notification preferences & filters', 'info')}
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs: All / Mentions */}
        <div className="flex border-t border-[#1E2028]">
          <button
            onClick={() => setActiveTab('all')}
            className="flex-1 relative py-3 text-center text-[15px] font-bold transition-colors hover:bg-white/[0.03]"
          >
            <span className={activeTab === 'all' ? 'text-white' : 'text-zinc-500'}>All</span>
            {activeTab === 'all' && (
              <span className="absolute bottom-0 left-12 right-12 h-1 bg-[#D6F174] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('mentions')}
            className="flex-1 relative py-3 text-center text-[15px] font-bold transition-colors hover:bg-white/[0.03]"
          >
            <span className={activeTab === 'mentions' ? 'text-white' : 'text-zinc-500'}>
              Mentions
            </span>
            {activeTab === 'mentions' && (
              <span className="absolute bottom-0 left-12 right-12 h-1 bg-[#D6F174] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Push Notifications Promo Banner (Matches Screenshot 2) */}
      {showPushBanner && (
        <div className="border-b border-[#1E2028] p-6 bg-[#16171E]/60">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display font-black text-2xl text-white tracking-tight">
              Push notifications
            </h3>
            <button
              onClick={() => setShowPushBanner(false)}
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-zinc-400 max-w-md mb-4 leading-relaxed">
            Never miss what's happening on GraverBurg by enabling push notifications for new vibes, replies, and mentions.
          </p>
          <button
            onClick={() => {
              setShowPushBanner(false);
              toast('Push notifications enabled for GraverBurg 🔔', 'celebrate');
            }}
            className="px-6 py-2.5 rounded-full bg-[#D6F174] hover:bg-[#c6e45f] text-black font-extrabold text-sm shadow-md active:scale-95 transition-all"
          >
            Turn on notifications
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="divide-y divide-[#1E2028]">
        {filteredNotifications.map((n) => {
          if (n.type === 'anniversary') {
            return (
              <div
                key={n.id}
                onClick={() => toast('Happy anniversary on GraverBurg! 🎂', 'celebrate')}
                className="px-6 py-4 hover:bg-white/[0.03] cursor-pointer transition-colors flex items-start gap-4 group"
              >
                <span className="text-2xl mt-0.5">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-200 leading-snug">
                    {n.content}{' '}
                    <span className="text-zinc-500 text-xs ml-1">· {n.time}</span>
                  </p>
                </div>
                <MoreHorizontalIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
              </div>
            );
          }

          return (
            <div
              key={n.id}
              onClick={() => toast(`Opening notification from ${n.userNames}`, 'info')}
              className="px-6 py-4 hover:bg-white/[0.03] cursor-pointer transition-colors flex items-start gap-4 group"
            >
              <div className="w-8 flex justify-center flex-shrink-0 mt-1">{n.icon}</div>

              <div className="flex-1 min-w-0">
                {/* Avatars */}
                <div className="flex items-center -space-x-1.5 mb-2">
                  {n.avatars?.map((av, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 border-2 border-[#0D0E12] flex-shrink-0"
                    >
                      <img src={av} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                <p className="text-sm text-zinc-100 leading-snug">
                  <span className="font-bold text-white hover:underline cursor-pointer">
                    {n.userNames}
                  </span>{' '}
                  <span className="text-zinc-300">{n.content}</span>
                </p>
                <span className="text-xs text-zinc-500 mt-1 block">{n.time}</span>
              </div>

              <MoreHorizontalIcon className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
