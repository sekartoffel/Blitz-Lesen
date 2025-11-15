
# ⚡ Blitz Lesen

Eine interaktive Web-App zum spielerischen Training der Leseflüssigkeit für Grundschulkinder.

## 🎯 Features

- **4 Schwierigkeitsstufen:** Wörter mit 1, 2, 3 oder 4 Silben
- **400 deutsche Wörter:** Sorgfältig ausgewählt aus dem Häufigkeitswortschatz
- **Spielerisches Training:** 10 Wörter pro Durchgang
- **Top 10 Rangliste:** Separate Bestenlisten für jede Silbenanzahl
- **Penalty-System:** 3 Sekunden pro übersprungenes Wort
- **Offline-fähig:** Funktioniert komplett ohne Internet
- **Responsive Design:** Läuft auf Desktop, Tablet und Smartphone

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

## 💾 Installation

### Option 1: Direkt im Browser öffnen

Einfach die `index.html` Datei im Browser öffnen - fertig!

### Option 2: GitHub Pages (für Online-Zugriff)

1. **Repository erstellen:**
- Gehe zu GitHub und erstelle ein neues Repository namens `blitz-lesen`
- Setze es auf “Public”
1. **Dateien hochladen:**
- Lade `index.html` und `README.md` hoch
1. **GitHub Pages aktivieren:**
- Gehe zu Repository Settings → Pages
- Source: “main” Branch
- Speichern
1. **Fertig!** Deine App ist unter `https://dein-username.github.io/blitz-lesen/` erreichbar

## 🛠️ Technologie

- **HTML5** - Struktur
- **CSS3** - Design mit Gradients und Animationen
- **Vanilla JavaScript** - Logik (kein Framework!)
- **LocalStorage** - Ranglisten-Speicherung

## 📱 Browser-Unterstützung

- ✅ Chrome/Edge (empfohlen)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile Browser (iOS/Android)

## 🎨 Anpassungen

Du kannst die App leicht anpassen:

### Farben ändern

Suche nach diesen CSS-Variablen:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Wörter hinzufügen

Im JavaScript-Bereich findest du das `WORDS` Objekt:

```javascript
const WORDS = {
    1: [...], // 1-silbige Wörter
    2: [...], // 2-silbige Wörter
    // ...
}
```

### Penalty-Zeit ändern

Suche nach:

```javascript
const penalty = gameState.wordsSkipped * 3; // Ändere die 3
```

## 📄 Lizenz

Dieses Projekt ist frei verwendbar für Bildungszwecke.

## 🤝 Beitragen

Verbesserungsvorschläge und Wort-Ergänzungen sind willkommen!

## 👨‍💻 Entwickelt mit

- Erstellt für Grundschulkinder zum spielerischen Lesetraining
- Basierend auf der pädagogischen Blitzlese-Methode
- Made with ❤️ for better reading skills

-----

**Viel Spaß beim Lesen! 📖⚡**