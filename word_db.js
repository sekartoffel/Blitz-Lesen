const WORDS ={
  1: [
      // Tiere
      'Hund', 'Kuh', 'Pferd', 'Fuchs', 'Hai', 'Wal', 'Wurm', 'Fisch', 'Huhn', 'Maus',
      // Natur
      'Baum', 'Gras', 'Wald', 'Berg', 'See', 'Fluss', 'Stein', 'Sand', 'Blatt', 'Ast',
      // Essen
      'Brot', 'Ei', 'Salz', 'Milch', 'Reis', 'Fisch', 'Fleisch', 'Saft', 'Eis', 'Brei',
      // Haus & Möbel
      'Haus', 'Tür', 'Dach', 'Wand', 'Bett', 'Stuhl', 'Tisch', 'Schrank', 'Topf', 'Glas',
      // Kleidung
      'Hut', 'Rock', 'Hemd', 'Hose', 'Schuh', 'Kleid', 'Gürtel', 'Schal', 'Mütze', 'Jacke',
      // Körper
      'Kopf', 'Arm', 'Bein', 'Hand', 'Fuß', 'Mund', 'Ohr', 'Zahn', 'Herz', 'Hals',
      // Gegenstände
      'Buch', 'Ball', 'Stift', 'Bild', 'Film', 'Boot', 'Zug', 'Tor', 'Zaun', 'Turm',
      // Diverses
      'Gold', 'Wind', 'Licht', 'Schnee', 'Fest', 'Spiel', 'Preis', 'Glück', 'Zeit', 'Ort',
      // Weitere Nomen
      'Korb', 'Kamm', 'Tuch', 'Nest', 'Kern', 'Halm', 'Staub', 'Dampf', 'Rauch', 'Strahl',
      // Zusätzliche Wörter
      'Ring', 'Spiegel', 'Brief', 'Keks', 'Schloss', 'Platz', 'Test', 'Text', 'Tanz', 'Frost'
  ],
  2: [
      // Familie
      'Ma-ma', 'Pa-pa', 'O-ma', 'O-pa', 'Tan-te', 'On-kel', 'Bru-der', 'Nef-fe', 'Nich-te', 'Cou-sin',
      // Tiere
      'Kat-ze', 'Pfer-de', 'Ti-ger', 'Lö-we', 'Af-fe', 'Bä-ren', 'Vö-gel', 'En-te', 'Gans', 'Schwan',
      // Schule
      'Schu-le', 'Ta-fel', 'Hef-te', 'Map-pe', 'Krei-de', 'Pau-se', 'Leh-rer', 'Klas-se', 'Stun-de', 'No-te',
      // Natur
      'Blu-me', 'Son-ne', 'Wol-ke', 'Re-gen', 'Wie-se', 'Hü-gel', 'In-sel', 'Teich', 'Quel-le', 'Wel-le',
      // Essen & Trinken
      'Ap-fel', 'Bir-ne', 'Zu-cker', 'Ho-nig', 'But-ter', 'Kä-se', 'Wurst', 'Sup-pe', 'Ku-chen', 'Piz-za',
      // Haushalt
      'Tel-ler', 'Ga-bel', 'Mes-ser', 'Löf-fel', 'Be-cher', 'Kan-ne', 'Scha-le', 'Pfan-ne', 'Tas-se', 'Fla-sche',
      // Transport
      'Au-to', 'Rol-ler', 'Wa-gen', 'Mo-tor', 'Rei-fen', 'Kof-fer', 'Ta-sche', 'Tü-te', 'Kar-ton', 'Pa-ket',
      // Haus
      'Gar-ten', 'Fens-ter', 'Trep-pe', 'Kel-ler', 'Bo-den', 'Raum', 'Zim-mer', 'Kü-che', 'Bad', 'Flu-r',
      // Zeit
      'Mor-gen', 'Mit-tag', 'A-bend', 'Nacht', 'Heu-te', 'Win-ter', 'Som-mer', 'Früh-ling', 'Herbst', 'Mo-nat',
      // Diverses
      'Far-be', 'Grö-ße', 'Län-ge', 'Brei-te', 'Hö-he', 'Tie-fe', 'Stär-ke', 'Käl-te', 'Wär-me', 'Hit-ze'
  ],
  3: [
      // Früchte
      'Ba-na-ne', 'O-ran-ge', 'Zi-tro-ne', 'A-na-nas', 'Erd-bee-re', 'Him-bee-re', 'Brom-bee-re', 'Kir-sche', 'Pflau-me', 'Me-lo-ne',
      // Gemüse
      'To-ma-te', 'Pap-ri-ka', 'Gur-ke', 'Zwie-bel', 'Möh-re', 'Boh-ne', 'Erb-se', 'Kar-tof-fel', 'Sel-le-rie', 'Ra-dies-chen',
      // Tiere
      'E-le-fant', 'Gi-raf-fe', 'Kro-ko-dil', 'Nas-horn', 'Pin-gu-in', 'Del-fin', 'Pan-da', 'Kan-gu-ru', 'Pa-pa-gei', 'Schmet-ter-ling',
      // Familie & Menschen
      'Fa-mi-lie', 'Mut-ter', 'Va-ter', 'Toch-ter', 'Schwes-ter', 'En-kel', 'Cou-si-ne', 'Nach-bar', 'Freun-din', 'Leh-re-rin',
      // Essen
      'Scho-ko-la-de', 'Nu-del', 'Bröt-chen', 'Jo-ghurt', 'Pud-ding', 'Sa-la-mi', 'Bon-bon', 'Ge-mü-se', 'Kar-tof-fel', 'O-me-lett',
      // Technik
      'Com-pu-ter', 'Te-le-fon', 'Ka-me-ra', 'Tab-let', 'Han-dy', 'Bat-te-rie', 'We-cker', 'Ra-dio', 'Lap-top', 'Dru-cker',
      // Musik
      'Gi-tar-re', 'Kla-vier', 'Trom-pe-te', 'Gei-ge', 'Flö-te', 'Trom-mel', 'Har-fe', 'Pan-flö-te', 'Man-do-li-ne', 'Xy-lo-fon',
      // Orte
      'Mu-se-um', 'Kran-ken-haus', 'Bü-che-rei', 'Bä-cke-rei', 'Ki-osk', 'Markt-platz', 'Flug-ha-fen', 'Bahn-hof', 'Hal-te-stel-le', 'Tank-stel-le',
      // Spielzeug
      'Spiel-zeug', 'Schau-kel', 'Rut-sche', 'Puz-zle', 'Krei-sel', 'Luft-bal-lon', 'Kar-te', 'Fi-gur', 'Pup-pe', 'Ro-bo-ter',
      // Natur
      'Re-gen-bo-gen', 'Ge-wit-ter', 'Ne-bel', 'Don-ner', 'Vul-kan', 'Ei-chen', 'Tan-ne', 'Blu-men', 'Grä-ser', 'Bü-sche'
  ],
  4: [
      // Orte & Gebäude
      'Kin-der-gar-ten', 'Klas-sen-zim-mer', 'Ba-de-zim-mer', 'Wohn-zim-mer', 'Schlaf-zim-mer', 'Ess-zim-mer', 'Ar-beits-zim-mer', 'Kin-der-zim-mer', 'Spei-se-kam-mer', 'Kel-ler-raum',
      // Fahrzeuge & Transport
      'Feu-er-wehr-au-to', 'Kran-ken-wa-gen', 'Hub-schrau-ber', 'Ei-sen-bahn', 'Las-ter-wa-gen', 'Mo-tor-rad', 'Om-ni-bus', 'Stra-ßen-bahn', 'Seil-bahn', 'Roll-trep-pe',
      // Essen & Süßigkeiten
      'Was-ser-me-lo-ne', 'Va-nil-le-eis', 'Ap-fel-ku-chen', 'Erb-sen-sup-pe', 'Nu-del-sup-pe', 'Kar-tof-fel-sa-lat', 'Obs-sa-lat', 'Reis-pud-ding', 'Zi-tro-nen-saft', 'Him-beer-saft',
      // Spielplätze & Sport
      'Spiel-platz-ge-rät', 'Schwimm-bad-be-cken', 'Fuß-ball-feld', 'Ten-nis-platz', 'Turn-hal-le', 'Sport-hal-le', 'Lauf-bahn', 'Spring-seil', 'Sand-kas-ten', 'Tram-po-lin',
      // Haushaltsgeräte
      'Wasch-ma-schi-ne', 'Spül-ma-schi-ne', 'Kühl-schrank', 'Mi-kro-wel-le', 'Staub-sau-ger', 'Bü-gel-ei-sen', 'Toas-ter', 'Was-ser-ko-cher', 'Kaf-fee-kan-ne', 'Mixer-ge-rät',
      // Feste & Feiern
      'Weih-nachts-baum', 'Os-ter-ha-se', 'Ni-ko-laus', 'Luft-schlan-ge', 'Kon-fet-ti', 'Gir-lan-de', 'Lam-pi-on', 'Ker-zen-stän-der', 'Ge-schenk-pa-pier', 'Par-ty-hut',
      // Tiere
      'Ma-ri-en-kä-fer', 'Re-gen-wurm', 'Was-ser-floh', 'See-pferd-chen', 'Tin-ten-fisch', 'Glüh-würm-chen', 'Schne-cken-haus', 'A-mei-sen-hau-fen', 'Spin-nen-netz', 'Bie-nen-stock',
      // Märchen & Fantasie
      'Prin-zes-sin', 'Kö-nig-reich', 'Zau-be-rer', 'Rit-ter-burg', 'Fee-nkö-ni-gin', 'Dra-chen-höh-le', 'Ein-horn-land', 'Zwer-gen-haus', 'Rie-sen-berg', 'He-xen-haus',
      // Schulsachen
      'Fe-der-map-pe', 'Li-ne-al-kas-ten', 'Ra-dier-gum-mi', 'Bunt-stift-satz', 'Schere-tui', 'Kle-ber-fla-sche', 'Blei-stift-spit-zer', 'Heft-um-schlag', 'Schul-ta-sche', 'Pau-sen-brot',
      // Natur & Wetter
      'Re-gen-schir-m', 'Son-nen-schir-m', 'Wet-ter-be-richt', 'Tem-pe-ra-tur', 'Jah-res-zeit', 'Him-mels-rich-tung', 'Mon-des-schein', 'Ster-nen-him-mel', 'Mor-gen-rot', 'A-bend-rot'
  ]
};
