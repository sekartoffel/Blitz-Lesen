# CLAUDE.md - AI Assistant Guide for Blitz Lesen

## Project Overview

**Blitz Lesen** is a Progressive Web App (PWA) for teaching German reading fluency to elementary school children. The name "Blitz Lesen" means "Flash Reading" in German, referring to a pedagogical method where children learn to recognize words as complete units rather than letter-by-letter.

**Key Facts:**
- **Target Users:** Elementary school children (Grundschule)
- **Language:** German (UI, documentation, and word content)
- **Type:** Single-page Progressive Web App
- **Tech Stack:** Pure vanilla JavaScript, HTML5, CSS3 (no frameworks or build tools)
- **Total Lines:** ~2,440 lines across 6 main files
- **Dependencies:** Only external CDN resources (Google Fonts, Supabase)

## Architecture Overview

### Single-Page Application Structure

This is a **completely self-contained SPA** with everything in one HTML file:

```
index.html (1,947 lines)
├── Head Section (lines 1-37)
│   ├── Cache-busting meta tags
│   ├── PWA manifest & icons
│   └── External resources (fonts, Supabase)
├── CSS Styles (lines 38-698)
│   ├── Responsive design (768px, 480px breakpoints)
│   ├── Purple gradient theme (#667eea → #764ba2)
│   └── Animations (fadeIn, slideDown, wordPop)
├── HTML Body (lines 700-993)
│   ├── Update notification banner
│   └── Five screen views:
│       ├── 1. Start Screen (name, group, buttons)
│       ├── 2. Settings Screen (game type, syllables, letters)
│       ├── 3. Leaderboard View (standalone)
│       ├── 4. Game Screen (word display, controls)
│       └── 5. Result Screen (score, leaderboard)
└── JavaScript (lines 995-1945)
    ├── Configuration (Supabase, game state)
    ├── UI Logic (screen switching, interactions)
    ├── Game Logic (word selection, timing, scoring)
    ├── Leaderboard (database integration)
    ├── Settings Management (localStorage)
    └── PWA/Service Worker Management
```

### File Structure

```
/home/user/Blitz-Lesen/
├── index.html              # Main application (HTML + CSS + JS)
├── service-worker.js       # PWA caching & offline support
├── word_db.js              # 400 German words organized by syllable count
├── manifest.json           # PWA configuration
├── icon-192.png            # PWA icon (192x192)
├── icon-512.png            # PWA icon (512x512)
├── README.md               # User-facing documentation (German)
├── SUPABASE_SETUP.md       # Database schema & migration guide
├── update-version.sh       # Cache version management script
└── .git/                   # Git repository
```

## Key Components & Their Locations

### Game State Management (index.html:1013-1027)

The central game state object:
```javascript
gameState = {
  playerName: '',         // Player's display name
  groupName: '',          // Group for leaderboard filtering
  syllables: 1,           // Selected difficulty (1-4 syllables)
  gameType: 'entziffern', // 'entziffern' (visible) or 'erkennen' (1sec flash)
  currentWordIndex: 0,
  wordsRead: 0,
  wordsSkipped: 0,
  startTime: null,
  elapsedTime: 0,
  currentWords: []
}
```

### Screen Navigation System (index.html:1540-1543)

Five screens managed by CSS class toggling:
- `#start-screen` - Initial screen with player setup
- `#settings-screen` - Game configuration
- `#leaderboard-view-screen` - Standalone leaderboard
- `#game-screen` - Active gameplay
- `#result-screen` - Post-game results

### Core Systems

#### 1. Word Database (word_db.js)

```javascript
const WORD_DATABASE = {
  "1": [75 words],     // Hund, Haus, Ball, Baum...
  "2": [150+ words],   // Mama, Papa, Katze, Blume...
  "3": [95+ words],    // Banane, Tomate, Elefant...
  "4": [80+ words]     // Kindergarten, Wassermelone...
}
```

**Total:** ~400 carefully selected German words from elementary school vocabulary.

#### 2. Game Flow

**File:** index.html (lines 1190-1349)

```
startGame() → getRandomWords() → showNextWord() → [read/skip] → endGame()
    ↓              ↓                    ↓                           ↓
Set timer    Filter by      Display with    Calculate score + penalty
             difficulty     1sec delay      Save to Supabase
                           (erkennen mode)
```

**Scoring System:**
- Base time: Actual elapsed time in seconds
- Penalty: +3 seconds per skipped word
- Final score: `elapsedTime + (wordsSkipped * 3)`

#### 3. Settings System (index.html:1545-1764)

**Features:**
- Letter/combination filtering (checkboxes with master toggles)
- Syllable count selection (1-4 buttons)
- Game type: "entziffern" (word stays) vs "erkennen" (1-sec flash)
- Persistence via localStorage

**Letter Groups:**
- Individual letters: M, A, L, O, etc.
- Combinations: SCH, AU, EI, CH, etc.
- Special characters: Ä, Ö, Ü, ß

**Word Filtering:**
The `isWordAllowed()` function checks if a word contains only selected letters.

#### 4. Leaderboard System (index.html:1350-1493)

**Database:** Supabase (PostgreSQL)
**Table:** `leaderboard`

**Schema:**
```sql
leaderboard (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,              -- player_name in code
  time INTEGER NOT NULL,           -- final score with penalties
  syllables INTEGER NOT NULL,      -- 1-4
  group_name TEXT,                 -- NULL = worldwide
  words_read INTEGER,
  words_skipped INTEGER,
  game_type TEXT,                  -- 'entziffern' or 'erkennen'
  created_at TIMESTAMP DEFAULT NOW()
)
```

**Filtering Logic:**
- **"Weltweit" (Worldwide):** Shows all entries (no group_name filter)
- **Custom Groups:** Filters by exact group_name match
- Always shows top 5 for the selected syllable count

#### 5. PWA & Service Worker (service-worker.js)

**Caching Strategy:**
- **Network-first for HTML:** Always try to fetch fresh content
- **Cache-first for assets:** Use cached versions, update in background

**Version Management:**
```javascript
const CACHE_VERSION = '2026-01-04-145431'; // Timestamp-based
```

**Update Flow:**
1. New service worker detected in background
2. Update banner appears: "Neue Version verfügbar!"
3. User clicks "Jetzt aktualisieren" button
4. `SKIP_WAITING` message sent to service worker
5. Page reloads automatically with new version

**Critical Bug Fix (index.html:1825-1849):**
Emergency cleanup code removes old buggy service workers that caused auto-reload issues.

## Development Workflows

### Git Branch Strategy

**IMPORTANT:** All development work uses branches prefixed with `claude/`:

```bash
# Current working branch
claude/add-claude-documentation-q9aoe

# Branch naming pattern
claude/<feature-description>-<session-id>
```

**Never push to:**
- `main` or `master` directly
- Branches without the `claude/` prefix (will fail with 403 error)

### Making Changes

#### 1. For UI/Content Changes

**Primary file:** `index.html`

**Before editing:**
```bash
# Always read the file first to understand context
Read tool on /home/user/Blitz-Lesen/index.html
```

**Common change locations:**
- CSS: Lines 38-698
- HTML structure: Lines 700-993
- JavaScript logic: Lines 995-1945

#### 2. For Word Database Changes

**File:** `word_db.js`

**Structure:**
```javascript
const WORD_DATABASE = {
  "1": ["Hund", "Haus", ...],  // Add/modify words here
  "2": ["Mama", "Papa", ...],
  "3": ["Banane", ...],
  "4": ["Kindergarten", ...]
}
```

**Important:** Ensure words are correctly categorized by syllable count.

#### 3. For PWA/Caching Changes

**File:** `service-worker.js`

**Before deployment:**
```bash
# Update cache version to force new download
./update-version.sh

# This auto-updates the CACHE_VERSION constant
```

### Version Management

**When to update cache version:**
- Significant HTML/CSS/JS changes
- Word database updates
- Bug fixes that affect functionality

**How to update:**
```bash
./update-version.sh
# Output: ✅ Cache version updated to: 2026-01-15-123045
# Then commit and push
```

### Testing Checklist

Since there's no automated testing, manually verify:

- [ ] **Cross-browser:** Chrome, Firefox, Safari, mobile browsers
- [ ] **Offline mode:** Disable network, verify app still works
- [ ] **Service worker:** Check update notification appears
- [ ] **Leaderboard:** Submit score, verify it appears in top 5
- [ ] **Settings:** Toggle letters, verify word filtering works
- [ ] **Game modes:** Test both "entziffern" and "erkennen"
- [ ] **Responsive:** Test at 768px and 480px breakpoints
- [ ] **localStorage:** Clear storage, verify settings persist

### Deployment Process

1. **Make changes** on `claude/*` branch
2. **Update cache version** (if needed): `./update-version.sh`
3. **Test locally** using the checklist above
4. **Commit** with descriptive message
5. **Push** to `claude/*` branch: `git push -u origin <branch-name>`
6. **Create PR** to main branch (if merging)
7. **Deploy** via static hosting (GitHub Pages, Netlify, etc.)

**Retry logic for network failures:**
- Git operations auto-retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

## Code Conventions & Patterns

### Language

**German UI Text:**
All user-facing text is in German. When adding/modifying UI text:

```javascript
// Correct
button.textContent = 'Jetzt aktualisieren';

// Incorrect
button.textContent = 'Update now';
```

**Common German Terms:**
- "Silben" = syllables
- "Gelesen" = read
- "Überspringen" = skip
- "Ergebnis" = result
- "Rangliste" = leaderboard
- "Einstellungen" = settings
- "Weltweit" = worldwide

### Naming Conventions

**JavaScript:**
- Variables: camelCase (`gameState`, `currentWordIndex`)
- Constants: SCREAMING_SNAKE_CASE (`SUPABASE_URL`, `WORD_DATABASE`)
- Functions: camelCase (`startGame()`, `showNextWord()`)

**CSS:**
- IDs: kebab-case (`#start-screen`, `#game-screen`)
- Classes: kebab-case (`.btn-primary`, `.leaderboard-table`)

**HTML:**
- IDs for major sections: `#start-screen`, `#result-screen`
- Classes for reusable styling: `.btn`, `.form-group`

### State Management Pattern

**Centralized game state:**
```javascript
// Single source of truth
const gameState = { ... };

// Update via direct assignment
gameState.playerName = document.getElementById('player-name').value;

// Read for display/logic
if (gameState.wordsSkipped > 0) { ... }
```

### Async/Await Pattern

**Supabase calls:**
```javascript
async function saveScore() {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .insert([scoreData]);

    if (error) throw error;
    // Handle success
  } catch (error) {
    console.error('Error:', error);
    // Graceful degradation
  }
}
```

### Screen Switching

**Always use the helper function:**
```javascript
// Correct
showScreen('game-screen');

// Incorrect - bypasses active state management
document.getElementById('game-screen').classList.remove('hidden');
```

### localStorage Usage

**Save settings:**
```javascript
localStorage.setItem('blitzlesen_setting_name', JSON.stringify(value));
```

**Load settings:**
```javascript
const saved = localStorage.getItem('blitzlesen_setting_name');
return saved ? JSON.parse(saved) : defaultValue;
```

**Key prefix:** Always use `blitzlesen_` to avoid conflicts.

## Important Gotchas & Known Issues

### 1. Service Worker Cache Management

**Problem:** Old cached versions can cause stale content or bugs.

**Solution:** Always update `CACHE_VERSION` when deploying significant changes.

```bash
./update-version.sh  # Before every major deployment
```

### 2. PWA Update Detection

**Problem (FIXED):** Old service workers had automatic `skipWaiting()` causing unexpected reloads.

**Current behavior:** User must click "Jetzt aktualisieren" button.

**Emergency cleanup code (index.html:1825-1849):**
Automatically detects and removes buggy old service workers.

### 3. Supabase Credentials

**Location:** index.html (lines 996-1007)

**Public keys:** The `SUPABASE_ANON_KEY` is intentionally public and safe to expose.

**Security:** Row Level Security (RLS) policies enforce access control:
- Public can READ all leaderboard entries
- Public can INSERT new scores
- No UPDATE or DELETE allowed

### 4. Font Loading

**Dependency:** Google Fonts (Playwrite DE Grund)

**Fallback:** System fonts if CDN fails:
```css
font-family: 'Playwrite DE Grund', 'Comic Sans MS', cursive;
```

### 5. Browser Compatibility

**Service Workers require HTTPS** (or localhost for testing).

**Minimum browser versions:**
- Chrome 40+
- Firefox 44+
- Safari 11.1+
- Edge 17+

### 6. Word Database Structure

**Critical:** word_db.js exports `WORD_DATABASE`, referenced in index.html.

**If renaming:** Update the import reference:
```javascript
const WORDS = WORD_DATABASE; // index.html line 1011
```

### 7. localStorage Limits

**Quota:** ~5-10MB per domain (browser-dependent)

**Current usage:** Minimal (<1KB for settings)

**Handle quota errors:**
```javascript
try {
  localStorage.setItem(key, value);
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    // Graceful degradation
  }
}
```

## Common Tasks

### Adding New Words

**File:** word_db.js

**Steps:**
1. Determine syllable count (1-4)
2. Add to appropriate array
3. Ensure word is age-appropriate (elementary school)
4. Test word filtering with letter settings

```javascript
const WORD_DATABASE = {
  "2": [
    "Mama", "Papa", "Katze",
    "NewWord" // Add here
  ]
}
```

### Changing Color Theme

**File:** index.html (CSS section, lines 38-698)

**Primary gradient:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Button colors:**
```css
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modifying Game Timing

**Word display duration (erkennen mode):**
```javascript
// index.html line ~1280
setTimeout(() => {
  wordDisplay.textContent = '...';
}, 1000); // Change from 1000ms (1 second)
```

**Penalty time:**
```javascript
// index.html line ~1305
const penalty = gameState.wordsSkipped * 3; // Change multiplier
```

### Adding New Game Modes

**Current modes:**
- `entziffern` - word stays visible
- `erkennen` - word flashes for 1 second

**To add new mode:**
1. Add button in settings UI (HTML)
2. Update `gameType` options
3. Modify `showNextWord()` logic (index.html:1260-1290)
4. Update Supabase schema if tracking mode-specific stats

### Customizing Leaderboard Display

**Top N entries:**
```javascript
// index.html line ~1390
.limit(5) // Change from 5 to desired count
```

**Filtering logic:**
```javascript
// index.html line ~1380-1400
let query = supabase
  .from('leaderboard')
  .select('*')
  .eq('syllables', syllableCount)
  .order('time', { ascending: true });

if (groupName && groupName !== 'Weltweit') {
  query = query.eq('group_name', groupName);
}
```

## Debugging Tips

### Service Worker Issues

**Check registration:**
```javascript
// Browser DevTools Console
navigator.serviceWorker.getRegistrations()
```

**Force update:**
```javascript
// In DevTools Application tab
// Check "Update on reload"
```

**Clear all caches:**
```javascript
// DevTools Console
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

### Supabase Connection Issues

**Test connection:**
```javascript
// Browser DevTools Console
await supabase.from('leaderboard').select('*').limit(1)
```

**Check network tab:**
- Look for requests to `*.supabase.co`
- Check for CORS errors
- Verify 200 status codes

### localStorage Issues

**Check stored data:**
```javascript
// Browser DevTools Console
Object.keys(localStorage)
  .filter(k => k.startsWith('blitzlesen_'))
  .forEach(k => console.log(k, localStorage.getItem(k)));
```

**Clear specific settings:**
```javascript
localStorage.removeItem('blitzlesen_settings_gameType');
```

### Word Filtering Not Working

**Check letter settings:**
```javascript
// index.html line ~1700
console.log('Selected letters:', getSelectedLetters());
console.log('Selected combinations:', getSelectedCombinations());
```

**Test word validation:**
```javascript
// Browser Console
isWordAllowed("Hund", selectedLetters, selectedCombinations);
```

## Recent Bug Fixes (Historical Context)

### January 2026 - Critical PWA Bugs

**Commits:**
- `22c01a0` - Merge PR #16 (Critical bug fixes)
- `8fd9699` - Fix critical bugs preventing app from working
- `66fe53c` - Emergency fix to auto-remove buggy service worker

**Issues Fixed:**
1. **Auto-reload bug:** Service worker was calling `skipWaiting()` automatically
   - **Fix:** Require user confirmation via "Jetzt aktualisieren" button

2. **Buggy cached versions:** Old service workers persisted and broke app
   - **Fix:** Emergency cleanup code (lines 1825-1849) detects and removes them

3. **Cache not updating:** Stale content served even after deployment
   - **Fix:** Timestamp-based `CACHE_VERSION` with `update-version.sh` script

**Learning:** Service worker lifecycle is tricky. Always test PWA updates thoroughly.

### December 2025 - UI Reorganization

**Commits:**
- `dd00e78` - Reorganize UI: Settings and Start screen
- `e3ddc84` - Clean up UI: Simplify font and result page

**Changes:**
- Separated settings from start screen
- Added dedicated settings button
- Simplified result page layout

### Earlier - Feature Additions

**PWA Update Detection:**
- Automatic checking every 60 minutes
- User-visible notification banner
- Controlled update mechanism

**Group-Based Leaderboards:**
- Added `group_name` field to database
- "Weltweit" vs custom group filtering
- Dynamic group dropdown from database

**Letter Difficulty Settings:**
- Checkbox system for letter/combination filtering
- Master toggles for letter groups
- Word filtering algorithm

## API Reference

### Supabase Configuration

**Endpoint:** `https://rhkfmpehmzjxgrddeiog.supabase.co`

**Public Key:** Stored in `SUPABASE_ANON_KEY` (safe to expose)

**Table:** `leaderboard`

**Operations:**
- `SELECT` - Get top scores for leaderboard
- `INSERT` - Submit new game result

**RLS Policies:**
- Public read access (all users can view leaderboard)
- Public insert access (all users can submit scores)
- No update/delete access (prevents cheating)

### localStorage Keys

All keys prefixed with `blitzlesen_`:

- `blitzlesen_settings_gameType` - 'entziffern' or 'erkennen'
- `blitzlesen_settings_syllables` - '1', '2', '3', or '4'
- `blitzlesen_settings_letters` - JSON array of selected letters
- `blitzlesen_settings_combinations` - JSON array of selected combinations
- `blitzlesen_settings_lastGroupName` - String, last used group name

## Best Practices for AI Assistants

### 1. Always Read Before Editing

**Never propose changes without reading the file first.**

```javascript
// Good workflow
1. Read tool on index.html
2. Understand context around target line
3. Make precise Edit with proper indentation
4. Test the change

// Bad workflow
1. Guess at file structure
2. Make blind edits
3. Break existing functionality
```

### 2. Respect the Single-File Architecture

**This is intentionally a monolithic file.** Don't suggest:
- "Let's split this into modules"
- "We should use a bundler"
- "Consider using React/Vue/Angular"

The simplicity is a feature, not a bug.

### 3. Maintain German UI Text

**When adding/modifying user-facing text:**
- Use German for all UI labels, buttons, messages
- Keep language simple (Grundschule level)
- Maintain consistent terminology with existing text

### 4. Test PWA Changes Carefully

**Service worker changes can break the entire app.**

Before modifying `service-worker.js`:
1. Read the current implementation
2. Understand the caching strategy
3. Test offline functionality after changes
4. Update `CACHE_VERSION` to force refresh

### 5. Preserve Educational Purpose

**Remember the target audience:**
- Elementary school children (ages 6-10)
- Learning to read German
- Need simple, clear, encouraging UI
- Colorful, playful design

**Don't add:**
- Complex features that confuse children
- Dark patterns or manipulative design
- Ads or tracking
- Content inappropriate for children

### 6. Handle Errors Gracefully

**Never let Supabase failures break the app.**

```javascript
// Good
try {
  await saveScore();
} catch (error) {
  console.error('Score save failed:', error);
  // App continues to work, just no online leaderboard
}

// Bad
const result = await saveScore(); // Uncaught error crashes app
```

### 7. Maintain Accessibility

**Keep the app usable for all children:**
- Large touch targets for small fingers
- High contrast text (WCAG AA minimum)
- Clear focus indicators
- Simple navigation flow

### 8. Document Significant Changes

**When making architectural changes:**
1. Update this CLAUDE.md file
2. Add comments in code for future maintainers
3. Update README.md if user-facing behavior changes
4. Document any new conventions or gotchas

### 9. Commit Messages

**Follow these conventions:**
```bash
# Good
git commit -m "Fix word filtering logic for umlauts"
git commit -m "Add 50 new three-syllable words to database"
git commit -m "Update service worker cache version to 2026-01-15"

# Bad
git commit -m "fixes"
git commit -m "update"
git commit -m "wip"
```

### 10. Branch and Push Protocol

**CRITICAL: Always use `claude/` prefix**

```bash
# Correct
git checkout -b claude/add-new-feature-abc123
git push -u origin claude/add-new-feature-abc123

# Wrong - will fail with 403
git checkout -b feature/new-feature
git push origin feature/new-feature
```

## Resources & Documentation

### Internal Documentation

- **README.md** - User guide (German)
- **SUPABASE_SETUP.md** - Database schema and migration guide
- **CLAUDE.md** - This file (AI assistant guide)

### External Resources

- **Supabase Docs:** https://supabase.com/docs
- **MDN Service Worker API:** https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **PWA Best Practices:** https://web.dev/progressive-web-apps/

### Pedagogical Background

**Blitzlesen Method:**
- German educational technique for reading fluency
- Focuses on whole-word recognition vs phonics
- Commonly used in Grundschule (elementary school)
- Similar to "sight words" in English education

### Browser APIs Used

- **Service Worker API** - Offline caching
- **localStorage API** - Settings persistence
- **Fetch API** - Supabase integration
- **Date API** - Timing and scoring

## Quick Reference

### File Locations Quick Guide

| Task | File | Lines |
|------|------|-------|
| UI Text Changes | index.html | 700-993 |
| Style Updates | index.html | 38-698 |
| Game Logic | index.html | 1190-1349 |
| Leaderboard Code | index.html | 1350-1493 |
| Settings Logic | index.html | 1545-1764 |
| PWA Update UI | index.html | 1819-1939 |
| Service Worker | service-worker.js | 1-136 |
| Word Database | word_db.js | 1-124 |
| Cache Version | service-worker.js | 1 |
| Supabase Config | index.html | 996-1007 |
| Game State | index.html | 1013-1027 |

### Common Line Number Ranges

**index.html sections:**
- Head & Meta: 1-37
- CSS Styles: 38-698
- HTML Structure: 700-993
- JavaScript Start: 995
- Config: 996-1027
- UI Event Handlers: 1030-1127
- Screen Management: 1128-1189
- Game Logic: 1190-1349
- Leaderboard: 1350-1493
- Results Display: 1494-1539
- Settings: 1545-1764
- Initialization: 1765-1818
- PWA Updates: 1819-1939
- Final Init: 1940-1945

### Commands Quick Reference

```bash
# Update cache version before deployment
./update-version.sh

# Push to correct branch
git push -u origin claude/<branch-name>

# Check service worker status
# (In browser DevTools console)
navigator.serviceWorker.getRegistrations()

# Test Supabase connection
# (In browser DevTools console)
await supabase.from('leaderboard').select('*').limit(1)

# Check localStorage
# (In browser DevTools console)
Object.keys(localStorage).filter(k => k.startsWith('blitzlesen_'))
```

---

## Revision History

- **2026-01-15** - Initial creation of CLAUDE.md
  - Comprehensive analysis of codebase structure
  - Documented architecture, conventions, and workflows
  - Added debugging tips and best practices
  - Created quick reference guide

---

**Last Updated:** 2026-01-15
**Maintainer:** sekartoffel
**Repository:** https://github.com/sekartoffel/Blitz-Lesen
