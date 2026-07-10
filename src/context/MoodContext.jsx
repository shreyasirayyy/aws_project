import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const MoodContext = createContext(null);

export const MOODS = [
  { key: 'joyful',  emoji: '☀️', label: 'Bright & Energized' },
  { key: 'neutral', emoji: '⛅', label: 'Calm & Balanced' },
  { key: 'anxious', emoji: '🌬️', label: 'Quiet & Reflective' },
  { key: 'sad',     emoji: '🌧️', label: 'Tense & Overwhelmed' },
  { key: 'numb',    emoji: '🌫️', label: 'Burnt Out & Unclear' },
];

const MOOD_MESSAGES = {
  default: "Take a moment, whenever you're ready.",
  joyful:  "Let this feeling stay a while.",
  neutral: "Steady is its own kind of good.",
  anxious: "Hey, slow down. You are doing completely fine.",
  sad:     "It's okay to just sit with this.",
  numb:    "No need to feel anything right now.",
};

const SEED_HOPE_TOKENS = [
  { id: 1, text: 'The morning I finally finished my thesis draft and just sat in silence, proud.', date: 'Feb 2026', image: null },
  { id: 2, text: "Priya told me I'm the calmest person she knows during a crisis. I want to remember that.", date: 'Apr 2026', image: null },
  { id: 3, text: 'Walked 6km along the river at sunset. No thoughts, just moving.', date: 'May 2026', image: null },
];

export function MoodProvider({ children }) {
  const [theme, setTheme] = useState('default');
  const [mode, setMode] = useState('light'); // 'light' | 'dark'
  const [moodHistory, setMoodHistory] = useState([]); // { mood, date }
  const [isAuthed, setIsAuthed] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [userName, setUserName] = useState('');
  const [hopeTokens, setHopeTokens] = useState(SEED_HOPE_TOKENS);

  const addHopeToken = useCallback((text, image = null) => {
    setHopeTokens((prev) => [{ id: Date.now(), text, image, date: 'Just now' }, ...prev]);
  }, []);

  const setMood = useCallback((moodKey) => {
    setTheme(moodKey);
    setMoodHistory((prev) => [...prev, { mood: moodKey, date: new Date().toISOString() }]);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  }, []);

  const signIn = useCallback((name = 'Friend') => {
    setIsAuthed(true);
    setIsGuest(false);
    setUserName(name);
  }, []);

  const continueAsGuest = useCallback(() => {
    setIsAuthed(true);
    setIsGuest(true);
    setUserName('Guest');
  }, []);

  const signOut = useCallback(() => {
    setIsAuthed(false);
    setIsGuest(false);
    setUserName('');
  }, []);

  // consecutive "storm" (sad) days — drives the Stormy Mode Alert
  const stormyStreak = useMemo(() => {
    let streak = 0;
    for (let i = moodHistory.length - 1; i >= 0; i--) {
      if (moodHistory[i].mood === 'sad') streak++;
      else break;
    }
    return streak;
  }, [moodHistory]);

  const value = {
    theme, setTheme,
    mode, toggleMode,
    mood: theme,
    setMood,
    moodHistory,
    stormyStreak,
    message: MOOD_MESSAGES[theme] || MOOD_MESSAGES.default,
    isAuthed, isGuest, userName,
    signIn, continueAsGuest, signOut,
    hopeTokens, addHopeToken,
  };

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error('useMood must be used within a MoodProvider');
  return ctx;
}
