import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LampToggle from '../components/LampToggle';
import MoodBackground from '../components/MoodBackground';
import Header from '../components/Header';
import MockOAuthModal from '../components/MockOAuthModal';
import { PrimaryButton, SecondaryButton, LinkButton, OAuthButton } from '../components/ui/Buttons';
import { HelpButton, MoodPicker } from '../components/ui/Misc';
import { useMood } from '../context/MoodContext';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16}>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.9 3.4 14.7 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.9S6.9 21.4 12 21.4c6.9 0 8.8-4.8 8.8-7.3 0-.5-.05-.9-.13-1.3H12z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16}>
      <path fill="currentColor" d="M16.5 1c.1 1.1-.3 2.2-1 3-.7.8-1.9 1.5-3 1.4-.1-1.1.4-2.2 1-2.9.8-.9 2-1.5 3-1.5zM20 17.2c-.5 1.2-1.1 2.3-1.9 3.4-1.1 1.5-2.2 3.1-4 3.1-1.7 0-2.2-1-4.1-1-2 0-2.6 1-4.2 1-1.7.1-3-1.6-4.1-3.1-2.3-3.2-4-9-1.7-13 1.1-2 3.1-3.2 5.2-3.3 1.6 0 3.2 1.1 4.1 1.1.9 0 2.8-1.3 4.7-1.1.8 0 3 .3 4.5 2.5-.1.1-2.7 1.6-2.6 4.7 0 3.7 3.2 4.9 3.2 4.9-.1.2-.5 1.7-1.1 2.8z" />
    </svg>
  );
}

export default function Landing() {
  const [lit, setLit] = useState(false);
  const [authView, setAuthView] = useState('default'); // 'default' | 'oauth'
  const [oauthProvider, setOauthProvider] = useState(null); // 'google' | 'apple' | null
  const [typed, setTyped] = useState('');
  const navigate = useNavigate();
  const { theme, mode, setMood, signIn, continueAsGuest, message } = useMood();
  const typeTimer = useRef(null);

  useEffect(() => {
    if (!lit) return;
    clearInterval(typeTimer.current);
    setTyped('');
    let i = 0;
    typeTimer.current = setInterval(() => {
      setTyped(message.slice(0, i + 1));
      i++;
      if (i >= message.length) clearInterval(typeTimer.current);
    }, 28);
    return () => clearInterval(typeTimer.current);
  }, [message, lit]);

  const handlePickMood = (moodKey) => {
    setMood(moodKey);
  };

  const handleEnter = (guest = false) => {
    if (guest) continueAsGuest();
    else signIn('Friend');
    navigate('/space');
  };

  if (!lit) {
    return <LampToggle onLit={() => setLit(true)} />;
  }

  return (
    <div className="app app-shell" data-theme={theme} data-mode={mode}>
      <MoodBackground />

      <Header
        right={<button onClick={() => navigate('/about')} className="text-[13px] px-5 py-[9px] rounded-full backdrop-blur-md" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text)' }}>About Us</button>}
      />

      <main className="relative z-10 flex-1 flex flex-col items-center text-center px-6 pt-6 pb-2">
        <div className="italic font-medium text-[26px] mb-1.5 opacity-85" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-deep)' }}>
          NoCaps
        </div>

        <h1
          className="max-w-[780px] mb-5"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.08, color: 'var(--text)' }}
        >
          A quiet space for your mind.
        </h1>
        <p className="max-w-[520px] text-[16px] leading-relaxed mb-5" style={{ color: 'var(--text-soft)' }}>
          Check in, reflect, and feel supported — at your own pace, in your own way.
        </p>
        <div className="italic text-[16px] min-h-[24px] mb-6 opacity-90" style={{ color: 'var(--accent-deep)', fontFamily: 'var(--font-display)' }}>
          <span style={{ borderRight: '1px solid var(--accent-deep)', paddingRight: 2 }}>{typed}</span>
        </div>

        <div className="w-full max-w-[360px] flex flex-col items-center gap-3">
          <AnimatePresence mode="wait">
            {authView === 'default' ? (
              <motion.div
                key="default"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="w-full flex flex-col items-center gap-3"
              >
                <PrimaryButton onClick={() => setAuthView('oauth')}>Sign In</PrimaryButton>
                <SecondaryButton onClick={() => setAuthView('oauth')}>Sign Up</SecondaryButton>
                <LinkButton onClick={() => handleEnter(true)}>Continue as Guest</LinkButton>
              </motion.div>
            ) : (
              <motion.div
                key="oauth"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="w-full flex flex-col items-center gap-3"
              >
                <div className="flex gap-2.5 w-full">
                  <OAuthButton icon={<GoogleIcon />} onClick={() => setOauthProvider('google')}>Google</OAuthButton>
                  <OAuthButton icon={<AppleIcon />} onClick={() => setOauthProvider('apple')}>Apple</OAuthButton>
                </div>
                <LinkButton onClick={() => setAuthView('default')}>← Back</LinkButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <MoodPicker activeMood={theme === 'default' ? null : theme} onPick={handlePickMood} />

      <HelpButton />

      <MockOAuthModal
        provider={oauthProvider}
        open={!!oauthProvider}
        onClose={() => setOauthProvider(null)}
        onComplete={(name) => {
          setOauthProvider(null);
          signIn(name);
          navigate('/space');
        }}
      />
    </div>
  );
}
