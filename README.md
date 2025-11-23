
# ⚡ Blitz Lesen

Eine interaktive Web-App zum spielerischen Training der Leseflüssigkeit für Grundschulkinder.

## 🎯 Features

- **4 Schwierigkeitsstufen:** Wörter mit 1, 2, 3 oder 4 Silben
- **400 deutsche Wörter:** Sorgfältig ausgewählt aus dem Häufigkeitswortschatz
- **2 Spielmodi:** Entziffern (Wort bleibt sichtbar) & Erkennen (1 Sekunde Blitz)
- **Erweiterte Schwierigkeitseinstellungen:** Filtere Wörter nach Buchstaben und Kombinationen
- **Spielerisches Training:** 10 Wörter pro Durchgang
- **Cloud-Rangliste:** Globale Top 5 Bestenlisten mit Supabase (optional)
- **Penalty-System:** 3 Sekunden pro übersprungenes Wort
- **Offline-fähig:** Funktioniert auch ohne Internet (localStorage Fallback)
- **Responsive Design:** Läuft auf Desktop, Tablet und Smartphone
- **PWA-fähig:** Als App auf dem Handy installierbar

## 🚀 Live Demo

**[Blitz Lesen spielen](https://dein-username.github.io/blitz-lesen/)**

*(Ersetze “dein-username” mit deinem GitHub-Benutzernamen)*

## 📚 Hintergrund

Blitzlesen ist eine bewährte Methode zur Förderung der Leseflüssigkeit in der Grundschule. Durch das schnelle Erkennen von Wörtern als Ganzes (statt Buchstabe für Buchstabe) wird die Lesegeschwindigkeit erhöht und das Textverständnis verbessert.

### Welche Wörter werden verwendet?

- **1 Silbe:** Hund, Haus, Ball, Baum…
- **2 Silben:** Mama, Papa, Katze, Blume…
- **3 Silben:** Banane, Tomate, Elefant…
- **4 Silben:** Kindergarten, Klassenzimmer, Wassermelone…

Alle Wörter sind:

- Kindgerecht und aus dem Alltag
- Aus dem deutschen Häufigkeitswortschatz
- Nach Silbenanzahl korrekt kategorisiert

## 🎮 Wie spielt man?

1. **Name eingeben**
1. **Silbenanzahl wählen** (1-4)
1. **START drücken**
1. Jedes Wort entweder mit **“GELESEN”** oder **“ÜBERSPRINGEN”** bestätigen
1. **Ergebnis ansehen** - Zeit, Wörter und Rangliste

## 💾 Installation & Setup

### Schnellstart (Lokal ohne Datenbank)

Einfach die `index.html` Datei im Browser öffnen - fertig! Die Rangliste wird im Browser gespeichert (localStorage).

### Mit Supabase Cloud-Datenbank (Empfohlen)

Für eine globale Rangliste, die geräteübergreifend funktioniert:

1. **Supabase Projekt erstellen** (kostenlos):
   - Gehe zu [supabase.com](https://supabase.com) und erstelle ein Konto
   - Erstelle ein neues Projekt
   - Siehe `SUPABASE_SETUP.md` für Details

2. **Datenbank einrichten**:
   - Öffne den SQL Editor in Supabase
   - Kopiere den Inhalt von `supabase/schema.sql`
   - Führe das SQL-Skript aus

3. **App konfigurieren**:
   - Öffne `index.html` in einem Editor
   - Ersetze `SUPABASE_URL` und `SUPABASE_ANON_KEY` mit deinen Werten (siehe Zeile 826-827)
   - Speichern

4. **Testen**:
   ```bash
   python -m http.server 8000
   # oder
   npx serve
   ```
   Öffne `http://localhost:8000`

### Online-Deployment

Siehe `DEPLOYMENT.md` für detaillierte Anleitungen zu:
- GitHub Pages (kostenlos)
- Vercel (empfohlen für Production)
- Netlify
- Cloudflare Pages

## 🛠️ Technologie-Stack

### Frontend
- **HTML5** - Struktur
- **CSS3** - Design mit Gradients und Animationen
- **Vanilla JavaScript** - Logik (kein Framework!)
- **Google Fonts** - Playwrite DE Grund (Grundschulschrift)
- **PWA** - Service Worker für Offline-Funktionalität

### Backend/Datenbank (Optional)
- **Supabase** - PostgreSQL Datenbank (Cloud)
- **localStorage** - Browser-basierter Fallback
- **Row Level Security (RLS)** - Sichere Datenbankzugriffe

### Architektur
- Single-Page Application (SPA)
- Progressive Web App (PWA)
- Dual-Storage: Supabase + localStorage Fallback

## 📱 Browser-Unterstützung

- ✅ Chrome/Edge (empfohlen)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile Browser (iOS/Android)

## 🎨 Anpassungen

Du kannst die App leicht anpassen:

### Farben ändern

Suche nach diesen CSS-Variablen in `index.html`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Wörter hinzufügen

Bearbeite die `word_db.js` Datei:

```javascript
const WORD_DATABASE = {
    1: [...], // 1-silbige Wörter
    2: [...], // 2-silbige Wörter
    3: [...], // 3-silbige Wörter
    4: [...], // 4-silbige Wörter
}
```

Oder migriere Wörter in die Supabase-Datenbank (siehe `supabase/migrate_words.sql`).

### Penalty-Zeit ändern

Suche in `index.html` nach:

```javascript
const penalty = gameState.wordsSkipped * 3; // Ändere die 3
```

### Anzahl Wörter pro Durchgang ändern

Suche nach:

```javascript
gameState.currentWords = getRandomWords(gameState.syllables, 10); // Ändere die 10
```

## 📁 Projektstruktur

```
blitz-lesen/
├── index.html              # Haupt-App (HTML + CSS + JS)
├── word_db.js             # 400 deutsche Wörter
├── manifest.json          # PWA Manifest
├── service-worker.js      # Offline-Funktionalität
├── icon-192.png          # App-Icon
├── icon-512.png          # App-Icon (groß)
├── supabase/
│   ├── schema.sql        # Datenbank-Schema
│   └── migrate_words.sql # Optional: Wörter in DB
├── SUPABASE_SETUP.md     # Supabase Einrichtung
├── DEPLOYMENT.md         # Deployment-Anleitung
├── .env.example          # Beispiel-Konfiguration
└── README.md             # Diese Datei
```

## 🔒 Sicherheit

- **Row Level Security (RLS)** aktiviert in Supabase
- Nur öffentlicher `anon` API-Key im Frontend (sicher)
- Keine sensiblen Daten werden gespeichert
- CORS-sicher für alle Domains
- Keine Authentifizierung erforderlich (anonymer Zugriff)

## 🚀 Performance

- **Blitzschnell**: < 50KB Gesamt-Größe
- **Offline-First**: PWA mit Service Worker
- **Kein Build-Prozess**: Reines HTML/CSS/JS
- **CDN-ready**: Funktioniert auf GitHub Pages, Vercel, Netlify
- **Supabase Free Tier**: 500MB DB, 2GB Bandbreite (mehr als genug!)

## 🐛 Troubleshooting

### Leaderboard wird nicht gespeichert
- Prüfe Browser-Konsole (F12) auf Fehler
- Vergewissere dich, dass Supabase-Credentials korrekt sind
- Stelle sicher, dass `schema.sql` in Supabase ausgeführt wurde

### "Supabase not configured" Warnung
- Normal, wenn Supabase nicht eingerichtet ist
- App funktioniert trotzdem mit localStorage
- Siehe `SUPABASE_SETUP.md` zum Einrichten

### Wörter werden nicht geladen
- Prüfe, ob `word_db.js` existiert und geladen wird
- Browser-Konsole prüfen: "Wort-Datenbank geladen!"
- Datei muss im selben Ordner wie `index.html` liegen

Mehr Hilfe: Siehe `DEPLOYMENT.md` Troubleshooting-Sektion

## 📄 Lizenz

Dieses Projekt ist frei verwendbar für Bildungszwecke.

## 🤝 Beitragen

Verbesserungsvorschläge und Wort-Ergänzungen sind willkommen!

1. Fork das Repository
2. Erstelle einen Feature-Branch
3. Committe deine Änderungen
4. Push zum Branch
5. Erstelle einen Pull Request

## 🙏 Danksagungen

- Wortschatz basierend auf dem deutschen Häufigkeitswortschatz für Grundschulen
- Schrift: Playwrite DE Grund (Google Fonts) - ähnlich der Grundschrift
- Inspiriert von der bewährten Blitzlese-Methode

## 👨‍💻 Entwickelt mit

- Erstellt für Grundschulkinder zum spielerischen Lesetraining
- Basierend auf der pädagogischen Blitzlese-Methode
- Made with ❤️ for better reading skills

-----

**Viel Spaß beim Lesen! 📖⚡**