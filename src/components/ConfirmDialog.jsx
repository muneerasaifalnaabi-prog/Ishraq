import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ConfirmDialog = () => {
  const { confirmState, resolveConfirm } = useAppContext();

  useEffect(() => {
    if (!confirmState) return;
    const onKey = (e) => {
      if (e.key === 'Escape') resolveConfirm(false);
      if (e.key === 'Enter') resolveConfirm(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmState, resolveConfirm]);

  if (!confirmState) return null;

  const { title, message, confirmLabel, cancelLabel, danger = true } = confirmState;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 bg-background/60 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={() => resolveConfirm(false)}
    >
      <div
        className="glass-premium w-full max-w-md rounded-[2.5rem] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.2)] border border-white/60 dark:border-white/10 relative animate-in zoom-in-95 duration-300 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center border ${danger ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-primary/10 border-primary/20 text-primary'}`}>
          <AlertTriangle className="w-7 h-7" strokeWidth={1.75} />
        </div>

        <h3 id="confirm-dialog-title" className="text-2xl font-serif tracking-tight text-foreground mb-3">
          {title}
        </h3>
        {message && (
          <p className="text-sm text-foreground/60 leading-relaxed mb-8">
            {message}
          </p>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => resolveConfirm(false)}
            className="flex-1 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.25em] bg-secondary text-foreground/70 hover:bg-secondary/70 transition-all duration-300"
          >
            {cancelLabel}
          </button>
          <button
            autoFocus
            onClick={() => resolveConfirm(true)}
            className={`flex-1 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.25em] text-white transition-all duration-300 shadow-md active:scale-95
              ${danger ? 'bg-rose-500 hover:bg-rose-600' : 'bg-primary hover:bg-foreground'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
