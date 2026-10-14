import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
} from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'celebrate';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD':
      // Max 4 toasts at once — remove oldest if over limit
      const next = [...state.toasts, action.toast];
      return { toasts: next.slice(-4) };
    case 'REMOVE':
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant, duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Icon map ────────────────────────────────────────────────────────────────

const ICONS: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
  celebrate: '🎉',
};

const COLORS: Record<ToastVariant, { bar: string; icon: string; border: string }> = {
  success: { bar: 'bg-[#D6F174]', icon: 'text-[#D6F174]', border: 'border-[#D6F174]/30' },
  error: { bar: 'bg-[#FA5D54]', icon: 'text-[#FA5D54]', border: 'border-[#FA5D54]/30' },
  info: { bar: 'bg-zinc-400', icon: 'text-zinc-400', border: 'border-zinc-400/30' },
  warning: { bar: 'bg-[#F7C948]', icon: 'text-[#F7C948]', border: 'border-[#F7C948]/30' },
  celebrate: { bar: 'bg-[#D6F174]', icon: 'text-[#D6F174]', border: 'border-[#D6F174]/40' },
};

// ─── Individual Toast Item ────────────────────────────────────────────────────

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const color = COLORS[toast.variant];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        relative flex items-center gap-3 w-full max-w-sm px-4 py-3 rounded-2xl
        bg-[#1A1B22] border ${color.border} shadow-2xl
        animate-[slideInRight_0.25s_ease-out]
        overflow-hidden
      `}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 inset-y-0 w-1 ${color.bar} rounded-l-2xl`} />

      {/* Icon */}
      <span className={`font-black text-sm flex-shrink-0 ml-1 ${color.icon}`}>
        {ICONS[toast.variant]}
      </span>

      {/* Message */}
      <p className="flex-1 text-sm font-medium text-zinc-100 leading-snug">{toast.message}</p>

      {/* Dismiss */}
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="w-6 h-6 flex items-center justify-center rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors text-xs flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
};

// ─── Provider ────────────────────────────────────────────────────────────────

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', id });
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 3500) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      dispatch({ type: 'ADD', toast: { id, message, variant, duration } });

      const timer = setTimeout(() => dismiss(id), duration);
      timersRef.current.set(id, timer);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}

      {/* Toast Viewport — bottom-right on desktop, bottom-center on mobile */}
      <div
        aria-label="Notifications"
        className="fixed z-[9999] bottom-24 right-4 sm:bottom-6 sm:right-5 flex flex-col gap-2 items-end pointer-events-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {state.toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto w-full">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
