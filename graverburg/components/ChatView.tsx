import React, { useState, useRef, useEffect } from 'react';
import { ChatConversation, ChatMessage } from '../lib/mockData';
import { SendIcon, MicIcon, PlayIcon, PauseIcon, ArrowLeftIcon, SparklesIcon } from './Icons';

interface ChatViewProps {
  conversations: ChatConversation[];
  onSendMessage: (conversationId: string, text: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversations,
  onSendMessage,
}) => {
  const [selectedChatId, setSelectedChatId] = useState<string>(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const selectedConversation = conversations.find((c) => c.id === selectedChatId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConversation) return;
    onSendMessage(selectedConversation.id, inputText.trim());
    setInputText('');
  };

  const toggleVoice = (msgId: string) => {
    setPlayingVoiceId(playingVoiceId === msgId ? null : msgId);
  };

  return (
    <div className="max-w-4xl mx-auto pb-28 px-4 pt-2">
      <div className="rounded-[32px] bg-[#16171E] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[700px]">
        {/* Left Conversation List */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 flex flex-col bg-[#14151B]">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="font-display font-extrabold text-lg text-white">Direct Messages</h2>
              <p className="text-[11px] text-zinc-400">Encrypted & Real-time</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D6F174]/20 text-[#D6F174]">
              {conversations.length} Active
            </span>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1.5">
            {conversations.map((conv) => {
              const isSelected = conv.id === selectedConversation?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChatId(conv.id)}
                  className={`p-3 rounded-2xl cursor-pointer flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-[#1F212B] border border-white/10 shadow-sm'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={conv.user.avatar} alt={conv.user.name} className="w-full h-full object-cover" />
                    {conv.user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#D6F174] border-2 border-[#16171E] rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white truncate">{conv.user.name}</span>
                      <span className="text-[10px] text-zinc-500">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#FA5D54] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Conversation Window */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-[#111217]">
            <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-[#16171E]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                  <img src={selectedConversation.user.avatar} alt={selectedConversation.user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {selectedConversation.user.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    {selectedConversation.user.status}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D6F174]/15 text-[#D6F174] border border-[#D6F174]/30">
                  Online
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3.5 no-scrollbar">
              {selectedConversation.messages.map((m) => {
                const isMe = m.sender === 'me';
                const isVoicePlaying = playingVoiceId === m.id;

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#FA5D54] text-white rounded-tr-none shadow-md'
                          : 'bg-[#1C1E26] text-zinc-200 border border-white/10 rounded-tl-none'
                      }`}
                    >
                      {m.isVoice ? (
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleVoice(m.id)}
                            className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white active:scale-95 transition-transform"
                          >
                            {isVoicePlaying ? (
                              <PauseIcon className="w-3.5 h-3.5" />
                            ) : (
                              <PlayIcon className="w-3.5 h-3.5 ml-0.5" />
                            )}
                          </button>
                          <div className="flex items-center gap-1 h-5">
                            <span className={`w-1 rounded-full bg-current ${isVoicePlaying ? 'soundwave-bar-1' : 'h-1.5'}`} />
                            <span className={`w-1 rounded-full bg-current ${isVoicePlaying ? 'soundwave-bar-2' : 'h-3'}`} />
                            <span className={`w-1 rounded-full bg-current ${isVoicePlaying ? 'soundwave-bar-3' : 'h-2'}`} />
                            <span className={`w-1 rounded-full bg-current ${isVoicePlaying ? 'soundwave-bar-4' : 'h-4'}`} />
                            <span className={`w-1 rounded-full bg-current ${isVoicePlaying ? 'soundwave-bar-5' : 'h-2'}`} />
                          </div>
                          <span className="text-[10px] opacity-80">{m.voiceDuration}</span>
                        </div>
                      ) : m.sticker ? (
                        <span className="text-3xl">{m.sticker}</span>
                      ) : (
                        <p>{m.text}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1 px-1">{m.time}</span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3.5 border-t border-white/10 bg-[#16171E] flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInputText((prev) => prev + ' 🔥')}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Add Sticker"
              >
                <SparklesIcon className="w-4 h-4 text-[#F7C948]" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${selectedConversation.user.name}...`}
                className="flex-1 px-4 py-2.5 rounded-full bg-[#101116] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#D6F174]"
              />

              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#D6F174] text-black hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <SendIcon className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
