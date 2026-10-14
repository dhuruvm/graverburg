import React, { useState, useCallback } from 'react';
import {
  INITIAL_USER,
  INITIAL_POSTS,
  INITIAL_STORIES,
  INITIAL_CHATS,
  UserProfile,
  Post,
  Story,
  ChatConversation,
} from '../lib/mockData';
import { ToastProvider, useToast } from '../components/ToastContext';
import { Navbar } from '../components/Navbar';
import { LeftSidebar, ActiveTab } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { FloatingDock } from '../components/FloatingDock';
import { FeedView } from '../components/FeedView';
import { ExploreView } from '../components/ExploreView';
import { NotificationsView } from '../components/NotificationsView';
import { FollowView } from '../components/FollowView';
import { ProfileView } from '../components/ProfileView';
import { ChatView } from '../components/ChatView';
import { TemplateShowcaseView } from '../components/TemplateShowcaseView';
import { CreatePostModal } from '../components/CreatePostModal';
import { StoryViewerModal } from '../components/StoryViewerModal';
import { CommentModal } from '../components/CommentModal';

// ─── Inner App (has access to ToastContext) ───────────────────────────────────

function AppInner() {
  const { toast } = useToast();

  // URL params for direct deep-linking
  const searchParams =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const urlTab = searchParams?.get('tab') as ActiveTab | null;
  const urlEmpty = searchParams?.get('empty') === 'true';
  const urlModal = searchParams?.get('modal') === 'create';

  const [activeTab, setActiveTab] = useState<ActiveTab>(urlTab || 'feed');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories] = useState<Story[]>(INITIAL_STORIES);
  const [chats, setChats] = useState<ChatConversation[]>(INITIAL_CHATS);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(urlModal);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [commentingPost, setCommentingPost] = useState<Post | null>(null);

  // ─── Optimistic Like ─────────────────────────────────────────────────────
  const handleLikePost = useCallback((postId: string) => {
    // Optimistic update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const hasLiked = !p.hasLiked;
        return { ...p, hasLiked, likes: hasLiked ? p.likes + 1 : Math.max(0, p.likes - 1) };
      })
    );
    // In production: call API here, rollback on error
  }, []);

  // ─── Optimistic Repost ───────────────────────────────────────────────────
  const handleRepostPost = useCallback(
    (postId: string) => {
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          const hasReposted = !p.hasReposted;
          if (hasReposted) toast('Reposted to your space!', 'success');
          return {
            ...p,
            hasReposted,
            reposts: hasReposted ? p.reposts + 1 : Math.max(0, p.reposts - 1),
          };
        })
      );
    },
    [toast]
  );

  // ─── Optimistic Bookmark ─────────────────────────────────────────────────
  const handleBookmarkPost = useCallback(
    (postId: string) => {
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          const hasBookmarked = !p.hasBookmarked;
          if (hasBookmarked) toast('Saved to your bookmarks', 'info');
          return { ...p, hasBookmarked };
        })
      );
    },
    [toast]
  );

  // ─── Share ───────────────────────────────────────────────────────────────
  const handleSharePost = useCallback(
    (post: Post) => {
      navigator.clipboard?.writeText(window.location.href);
      toast(`Link copied for "${post.title || 'this post'}"`, 'success');
    },
    [toast]
  );

  // ─── Add Post ────────────────────────────────────────────────────────────
  const handleAddPost = useCallback(
    (newPost: Post) => {
      setPosts((prev) => [newPost, ...prev]);
      toast('Post published to GraverBurg! ✨', 'celebrate');
    },
    [toast]
  );

  // ─── Add Comment ─────────────────────────────────────────────────────────
  const handleAddComment = useCallback(
    (postId: string, commentText: string) => {
      const newComment = {
        id: `c-${Date.now()}`,
        author: user.name,
        handle: user.handle,
        avatar: user.avatar,
        content: commentText,
        time: 'Just now',
      };

      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          const updated = [...(p.comments || []), newComment];
          return { ...p, comments: updated, replies: updated.length };
        })
      );

      // Keep modal post in sync
      if (commentingPost?.id === postId) {
        setCommentingPost((curr) =>
          curr
            ? { ...curr, comments: [...(curr.comments || []), newComment], replies: (curr.comments || []).length + 1 }
            : null
        );
      }

      toast('Reply posted!', 'success');
    },
    [toast, commentingPost, user]
  );

  // ─── Send Message (optimistic) ───────────────────────────────────────────
  const handleSendMessage = useCallback(
    (conversationId: string, text: string) => {
      const msgId = `msg-${Date.now()}`;
      const newMsg = { id: msgId, sender: 'me' as const, text, time: 'Just now' };

      // Optimistic append
      setChats((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? { ...c, lastMessage: text, lastMessageTime: 'Just now', messages: [...c.messages, newMsg] }
            : c
        )
      );

      // Simulated persona reply
      setTimeout(() => {
        const replies = [
          'Vibe check passed! 🚀',
          'Totally agree — the new aesthetic is fire.',
          'Did you check out the new photo wall block on my profile?',
          'Say less, let me remix that theme right now 🎨',
          'Haha exactly! Catch you in the lounge later 🌙',
        ];
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'other' as const,
          text: replies[Math.floor(Math.random() * replies.length)],
          time: 'Just now',
        };
        setChats((c) =>
          c.map((conv) =>
            conv.id === conversationId
              ? { ...conv, lastMessage: botMsg.text, messages: [...conv.messages, botMsg] }
              : conv
          )
        );
      }, 1200);
    },
    []
  );

  // ─── Theme Remix ─────────────────────────────────────────────────────────
  const handleRemixTheme = useCallback(() => {
    const themes: Array<'lime' | 'yellow' | 'coral' | 'dark' | 'synthwave'> = [
      'lime', 'yellow', 'coral', 'dark', 'synthwave',
    ];
    const next = themes[(themes.indexOf(user.theme) + 1) % themes.length];
    setUser((u) => ({ ...u, theme: next }));
    toast(`Theme remixed to "${next.toUpperCase()}" 🎨`, 'celebrate');
  }, [user.theme, toast]);

  return (
    <div className="min-h-screen bg-[#0D0E12] text-[#F3F4F6] relative flex flex-col font-sans">
      {/* Mobile Top Nav */}
      <div className="lg:hidden">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} openCreateModal={() => setIsCreateModalOpen(true)} />
      </div>

      {/* 3-Column Layout */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto flex">
        {/* Left: Navigation Rail */}
        <LeftSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openCreateModal={() => setIsCreateModalOpen(true)}
          unreadChatCount={2}
        />

        {/* Center: Main Stream */}
        <main
          className={`flex-1 min-h-screen border-x border-[#1E2028] bg-[#0D0E12] ${
            activeTab === 'showcase' ? 'max-w-5xl' : 'max-w-2xl'
          } w-full`}
        >
          {activeTab === 'feed' && (
            <FeedView
              posts={posts}
              stories={stories}
              onLikePost={handleLikePost}
              onRepostPost={handleRepostPost}
              onBookmarkPost={handleBookmarkPost}
              onOpenComments={(post) => setCommentingPost(post)}
              onOpenStory={(index) => setSelectedStoryIndex(index)}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              onSharePost={handleSharePost}
              onAddNewPost={handleAddPost}
            />
          )}

          {activeTab === 'explore' && (
            <ExploreView onSelectTopic={(tag) => toast(`Browsing: ${tag}`, 'info')} />
          )}

          {activeTab === 'notifications' && (
            <NotificationsView />
          )}

          {activeTab === 'follow' && (
            <FollowView onBackToFeed={() => setActiveTab('feed')} />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              user={user}
              posts={posts}
              onUpdateUser={setUser}
              onRemixTheme={handleRemixTheme}
              onBackToFeed={() => setActiveTab('feed')}
              initialEmpty={urlEmpty}
            />
          )}

          {activeTab === 'chat' && (
            <ChatView conversations={chats} onSendMessage={handleSendMessage} />
          )}

          {activeTab === 'showcase' && (
            <TemplateShowcaseView onOpenCreate={() => setIsCreateModalOpen(true)} />
          )}
        </main>

        {/* Right: Trending + Suggestions (hidden in showcase) */}
        {activeTab !== 'showcase' && (
          <RightSidebar
            onSelectTopic={(tag) => toast(`Filtering: ${tag}`, 'info')}
            openCreateModal={() => setIsCreateModalOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
      </div>

      {/* Mobile Bottom Dock */}
      <FloatingDock
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCreateModal={() => setIsCreateModalOpen(true)}
        unreadCount={2}
      />

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddPost={handleAddPost}
      />

      {selectedStoryIndex !== null && (
        <StoryViewerModal
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          onClose={() => setSelectedStoryIndex(null)}
        />
      )}

      {commentingPost && (
        <CommentModal
          post={commentingPost}
          onClose={() => setCommentingPost(null)}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}

// ─── Root with Provider ───────────────────────────────────────────────────────

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
