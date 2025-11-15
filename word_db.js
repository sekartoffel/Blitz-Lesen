// Blitz Lesen - Wörter-Datenbank
// 400 deutsche Wörter sortiert nach Silbenanzahl

const WORDS = {
  "1": [
    // Tiere
    'Hund', 'Kuh', 'Pferd', 'Fuchs', 'Hai', 'Wal', 'Wurm', 'Fisch', 'Huhn', 'Maus',
    // Natur
    'Baum', 'Gras', 'Wald', 'Berg', 'See', 'Fluss', 'Stein', 'Sand', 'Blatt', 'Ast',
    // Essen
    'Brot', 'Ei', 'Salz', 'Milch', 'Reis', 'Fleisch', 'Saft', 'Eis', 'Brei',
    // Haus & Möbel
    'Haus', 'Tür', 'Dach', 'Wand', 'Bett', 'Stuhl', 'Tisch', 'Schrank', 'Topf', 'Glas',
    // Kleidung
    'Hut', 'Rock', 'Hemd', 'Schuh', 'Kleid', 'Schal',
    // Körper
    'Kopf', 'Arm', 'Bein', 'Hand', 'Fuß', 'Mund', 'Ohr', 'Zahn', 'Herz', 'Hals',
    // Gegenstände
    'Buch', 'Ball', 'Stift', 'Bild', 'Film', 'Boot', 'Zug', 'Tor', 'Zaun', 'Turm',
    // Diverses
    'Gold', 'Wind', 'Licht', 'Schnee', 'Fest', 'Spiel', 'Preis', 'Glück', 'Zeit', 'Ort',
    // Weitere Nomen
    'Korb', 'Kamm', 'Tuch', 'Nest', 'Kern', 'Halm', 'Staub', 'Dampf', 'Rauch', 'Strahl',
    // Zusätzliche Wörter
    'Ring', 'Brief', 'Keks', 'Schloss', 'Platz', 'Test', 'Text', 'Tanz', 'Frost',
    // Weitere
    'Welt', 'Strand', 'Wolf', 'Bär', 'Schwein', 'Schaf', 'Krebs', 'Topf', 'Luft', 'Duft'
  ],
  "2": [
    // Familie
    'Mama', 'Papa', 'Oma', 'Opa', 'Tante', 'Onkel', 'Bruder', 'Neffe', 'Nichte', 'Cousin',
    // Tiere
    'Katze', 'Pferde', 'Tiger', 'Löwe', 'Affe', 'Bären', 'Vögel', 'Ente', 'Gans', 'Schwan',
    // Schule
    'Schule', 'Tafel', 'Hefte', 'Mappe', 'Kreide', 'Pause', 'Lehrer', 'Klasse', 'Stunde', 'Note',
    // Natur
    'Blume', 'Sonne', 'Wolke', 'Regen', 'Wiese', 'Hügel', 'Insel', 'Teich', 'Quelle', 'Welle',
    // Essen & Trinken
    'Apfel', 'Birne', 'Zucker', 'Honig', 'Butter', 'Käse', 'Wurst', 'Suppe', 'Kuchen', 'Pizza',
    // Haushalt
    'Teller', 'Gabel', 'Messer', 'Löffel', 'Becher', 'Kanne', 'Schale', 'Pfanne', 'Tasse', 'Flasche',
    // Transport
    'Auto', 'Roller', 'Wagen', 'Motor', 'Reifen', 'Koffer', 'Tasche', 'Tüte', 'Karton', 'Paket',
    // Haus
    'Garten', 'Fenster', 'Treppe', 'Keller', 'Boden', 'Raum', 'Zimmer', 'Küche', 'Bad', 'Flur',
    // Zeit
    'Morgen', 'Mittag', 'Abend', 'Nacht', 'Heute', 'Winter', 'Sommer', 'Frühling', 'Herbst', 'Monat',
    // Diverses
    'Farbe', 'Größe', 'Länge', 'Breite', 'Höhe', 'Tiefe', 'Stärke', 'Kälte', 'Wärme', 'Hitze',
    // Von Array 1 verschoben
    'Hose', 'Gürtel', 'Mütze', 'Jacke', 'Spiegel',
    // Von Array 3 verschoben
    'Kirsche', 'Pflaume', 'Gurke', 'Zwiebel', 'Möhre', 'Bohne', 'Erbse', 'Nashorn', 'Delfin', 'Panda',
    'Mutter', 'Vater', 'Tochter', 'Schwester', 'Enkel', 'Nachbar', 'Freundin',
    'Nudel', 'Brötchen', 'Joghurt', 'Pudding', 'Bonbon',
    'Tablet', 'Handy', 'Wecker', 'Radio', 'Laptop', 'Drucker',
    'Klavier', 'Geige', 'Flöte', 'Trommel', 'Harfe',
    'Kiosk', 'Marktplatz', 'Bahnhof',
    'Spielzeug', 'Schaukel', 'Rutsche', 'Puzzle', 'Kreisel', 'Karte', 'Figur', 'Puppe',
    'Nebel', 'Donner', 'Vulkan', 'Eichen', 'Tanne', 'Blumen', 'Gräser', 'Büsche',
    // Von Array 4 verschoben
    'Seilbahn', 'Laufbahn', 'Springseil', 'Kühlschrank', 'Toaster'
  ],
  "3": [
    // Früchte
    'Banane', 'Orange', 'Zitrone', 'Ananas', 'Erdbeere', 'Himbeere', 'Brombeere', 'Melone',
    // Gemüse
    'Tomate', 'Paprika', 'Kartoffel', 'Sellerie', 'Radieschen',
    // Tiere
    'Elefant', 'Giraffe', 'Krokodil', 'Pinguin', 'Känguru', 'Papagei', 'Schmetterling',
    // Familie & Menschen
    'Familie', 'Cousine', 'Lehrerin',
    // Essen
    'Salami', 'Gemüse', 'Omelett',
    // Technik
    'Computer', 'Telefon', 'Kamera', 'Batterie',
    // Musik
    'Gitarre', 'Trompete', 'Panflöte', 'Xylofon',
    // Orte
    'Museum', 'Krankenhaus', 'Bücherei', 'Bäckerei', 'Flughafen', 'Tankstelle',
    // Spielzeug
    'Luftballon', 'Roboter',
    // Natur
    'Gewitter',
    // Von Array 4 verschoben
    'Wohnzimmer', 'Schlafzimmer', 'Esszimmer', 'Kellerraum',
    'Hubschrauber', 'Eisenbahn', 'Motorrad', 'Omnibus', 'Straßenbahn', 'Rolltreppe',
    'Obstsalat', 'Reispudding', 'Himbeersaft',
    'Fußballfeld', 'Tennisplatz', 'Turnhalle', 'Sporthalle', 'Sandkasten', 'Trampolin',
    'Staubsauger', 'Mixergerät',
    'Weihnachtsbaum', 'Nikolaus', 'Luftschlange', 'Konfetti', 'Girlande', 'Lampion', 'Partyhut',
    'Regenwurm', 'Wasserfloh', 'Seepferdchen', 'Tintenfisch', 'Glühwürmchen', 'Schneckenhaus', 'Spinnennetz', 'Bienenstock',
    'Prinzessin', 'Königreich', 'Zauberer', 'Ritterburg', 'Einhornland', 'Zwergenhaus', 'Riesenberg', 'Hexenhaus',
    'Buntstiftsatz', 'Scherentui', 'Heftumschlag', 'Schultasche', 'Pausenbrot',
    'Regenschirm', 'Sonnenschirm', 'Jahreszeit', 'Mondeschein', 'Morgenrot', 'Abendrot'
  ],
  "4": [
    // Orte & Gebäude
    'Kindergarten', 'Klassenzimmer', 'Badezimmer', 'Arbeitszimmer', 'Kinderzimmer', 'Speisekammer',
    // Fahrzeuge & Transport
    'Krankenwagen', 'Lasterwagen',
    // Essen & Süßigkeiten
    'Vanilleeis', 'Apfelkuchen', 'Erbsensuppe', 'Nudelsuppe', 'Zitronensaft',
    // Spielplätze & Sport
    'Spielplatzgerät', 'Schwimmbecken',
    // Haushaltsgeräte
    'Waschmaschine', 'Spülmaschine', 'Mikrowelle', 'Bügeleisen', 'Wasserkocher', 'Kaffeekanne',
    // Feste & Feiern
    'Osterhase', 'Kerzenständer', 'Geschenkpapier',
    // Märchen & Fantasie
    'Feenkönigin', 'Drachenhöhle',
    // Schulsachen
    'Federmappe', 'Radiergummi', 'Kleberflasche', 'Bleistiftspitzer',
    // Natur & Wetter
    'Wetterbericht', 'Temperatur', 'Himmelsrichtung', 'Sternenhimmel',
    // Von Array 3 verschoben
    'Schokolade', 'Mandoline', 'Haltestelle', 'Regenbogen',
    // Neue Wörter für Array 4
    'Familienfest', 'Geburtstagskind', 'Spielzeugkiste', 'Bilderbuchseite', 'Kindergartenkind',
    'Schulranzenset', 'Brotdosenfach', 'Turnschuhpaar', 'Regenjacke', 'Wintermantel',
    'Sommerferien', 'Hausaufgaben', 'Freundebuch', 'Lieblingsfarbe', 'Lieblingstier',
    'Lieblingsessen', 'Kuscheltiercke', 'Malkastenfarbe', 'Wasserfarbenkasten', 'Wachsmalstifte'
  ]
};
