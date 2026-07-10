
src/
├── components/
│   ├── LampToggle.jsx        # entry interaction — pull the string to enter the app
│   ├── MoodBackground.jsx    # celestial body, particles, grain, lightning per mood
│   ├── StormyAlert.jsx       # the "Stormy Mode" gentle check-in dialog
│   ├── GuestSignInPrompt.jsx # shown when a guest tries to write
│   ├── DrawCanvas.jsx        # freehand scribble/draw tool
│   ├── VoiceNotes.jsx        # mic recording via MediaRecorder API
│   ├── FloatingHope.jsx      # floating unlock button, shown on tough mood days
│   ├── Header.jsx
│   └── ui/
│       ├── Buttons.jsx       # PrimaryButton, SecondaryButton, LinkButton, OAuthButton
│       └── Misc.jsx          # HelpButton, MoodPicker
├── context/
│   └── MoodContext.jsx       # global mood/theme/dark-mode/auth/hopeTokens state (useMood hook)
├── pages/
│   ├── Landing.jsx           # lamp → NoCaps landing (auth + mood picker)
│   ├── AboutUs.jsx           # freeform about page
│   ├── MySpace.jsx           # chat with Wisp + journal (Write/Draw/Voice tabs)
│   ├── HopeVault.jsx         # locked drawer of self-sourced positive memories + images
│   ├── SafeCircle.jsx        # up to 5 trusted contacts, quiet reach-out signal
│   ├── MoodInsights.jsx      # weekly mood chart + stats
│   └── CalmSpace.jsx         # Continuous Flow Mode (no-backspace brain dump)
├── styles/
│   └── themes.css            # all 5 mood palettes × light/dark, shared keyframes
├── App.jsx                   # routes
└── main.jsx
