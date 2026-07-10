import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROVIDER_ACCOUNTS = {
  google: [
    { name: 'Alex Rivera', email: 'alex.rivera@gmail.com', color: '#4285F4' },
    { name: 'Use another account', email: null, color: '#5f6368' },
  ],
  apple: [
    { name: 'Alex Rivera', email: 'alex.rivera@icloud.com', color: '#555' },
    { name: 'Use another Apple ID', email: null, color: '#888' },
  ],
};

/**
 * Simulates a native OAuth account-chooser flow (Google/Apple).
 * Note: this is a UI-only simulation — wiring it to real Google/Apple
 * sign-in requires a backend with OAuth client credentials.
 */
export default function MockOAuthModal({ provider, open, onClose, onComplete }) {
  const [step, setStep] = useState('choose'); // choose | connecting
  const accounts = provider ? PROVIDER_ACCOUNTS[provider] : [];
  const label = provider === 'google' ? 'Google' : 'Apple';

  const pick = (account) => {
    if (!account.email) return; // "use another account" is a visual dead-end in this demo
    setStep('connecting');
    setTimeout(() => {
      onComplete?.(account.name);
      setStep('choose');
    }, 1100);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => step === 'choose' && onClose?.()}
        >
          <motion.div
            className="w-full max-w-[360px] rounded-2xl overflow-hidden bg-white text-[#1f1f1f]"
            style={{ boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pb-4 flex flex-col items-center text-center border-b border-[#eee]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3 text-lg font-bold" style={{ background: provider === 'google' ? '#4285F4' : '#000', color: '#fff' }}>
                {provider === 'google' ? 'G' : ''}
              </div>
              <h2 className="text-lg font-medium mb-1">
                {step === 'choose' ? `Sign in with ${label}` : 'Connecting…'}
              </h2>
              <p className="text-[13px] text-[#5f6368]">to continue to NoCaps</p>
            </div>

            {step === 'choose' ? (
              <div className="py-2">
                {accounts.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => pick(a)}
                    className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-[#f5f5f5] text-left"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0" style={{ background: a.color }}>
                      {a.email ? a.name.charAt(0) : '+'}
                    </div>
                    <div>
                      <div className="text-sm">{a.name}</div>
                      {a.email && <div className="text-xs text-[#5f6368]">{a.email}</div>}
                    </div>
                  </button>
                ))}
                <div className="px-6 pt-4 pb-5 text-[11px] text-[#5f6368] leading-relaxed">
                  This is a demo sign-in flow. Wiring real {label} authentication needs an OAuth
                  client set up on a backend.
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-10">
                <motion.div
                  className="w-8 h-8 rounded-full border-2 border-[#e0e0e0]"
                  style={{ borderTopColor: provider === 'google' ? '#4285F4' : '#000' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
                <p className="text-sm text-[#5f6368]">Signing you in…</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
