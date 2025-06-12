import React, { useState, useMemo } from 'react';
import './App.css';
import { Card, CardContent } from './components/ui/card/card';
import { Button } from './components/ui/button/button';


const allQuestions = 
[
  {
    "question": "Zasada Huygensa pozwala na",
    "options": [
      "stworzenie pozornych źródeł poza obszarem odsłuchu",
      "zmniejszenie echa w przypadku nagłaśniania dużych pomieszczeń",
      "odwzorowanie przestrzennego rozkładu pola akustycznego",
      "podwyższenie jakości dźwięku kompresowanego algorytmami stratnymi"
    ],
    "correct": [
      "odwzorowanie przestrzennego rozkładu pola akustycznego",
      "stworzenie pozornych źródeł poza obszarem odsłuchu"
    ]
  },
  {
    "question": "Wyróżniamy następujące rodzaje transmisji strumieniowej",
    "options": [
      "Transmisja wielu-do-wielu (ang. Varicast)",
      "Transmisja rozgłoszeniowa (ang. Broadcast)",
      "Transmisja jeden-do-wielu (ang. Multicast),",
      "Transmisja jeden-do-jednego (ang. Unicast),"
    ],
    "correct": [
      "Transmisja jeden-do-jednego (ang. Unicast),",
      "Transmisja jeden-do-wielu (ang. Multicast),",
      "Transmisja rozgłoszeniowa (ang. Broadcast)"
    ]
  },
  {
    "question": "Wadą znakowania wodnego dla video wykorzystującego takie same znaki wodne dla każdej klatki jest:",
    "options": [
      "problem z zachowaniem niewidzialności statystycznej,",
      "łatwość usuwania znaków wodnych,",
      "zmienny poziom szumu dla różnych klatek,",
      "duża złożoność obliczeniowa,"
    ],
    "correct": [
      "problem z zachowaniem niewidzialności statystycznej,"
    ]
  },
  {
    "question": "Zaznacz rodzaje pamieci masowej:",
    "options": [
      "pamięć obiektowa,",
      "pamięć równoległa,",
      "pamięć szeregowa,",
      "pamięć plikowa,",
      "pamięć blokowa,"
    ],
    "correct": [
      "pamięć blokowa,",
      "pamięć obiektowa,",
      "pamięć plikowa,"
    ]
  },
  {
    "question": "Drogą przekazu wyłącznie akustycznego człowiek przyjmuje około X% informacji. Przy przekazie słownym i wizualnym - około Y%",
    "options": [
      "X=10, Y=70",
      "X=20, Y=90",
      "X=30, Y=80",
      "X=50, Y=100"
    ],
    "correct": [
      "X=30, Y=80"
    ]
  },
  {
    "question": "Po wykonaniu algorytmu ByteRun na ciągu 1,1,1,1,2,2,2,3,3,3,3,1,2,3,1,2,3,4,5 uzyska się następujący wynik:",
    "options": [
      "4,1,3,2,4,3,0,7,1,2,3,1,2,3,4,5,0",
      "-3,1,-2,2,-3,3,7,1,2,3,1,2,3,4,5,0",
      "-3,1,-2,2,-3,3,7,1,2,3,1,2,3,4,5",
      "3,1,3,2,4,3,0,7,1,2,3,1,2,3,4,5"
    ],
    "correct": [
      "-3,1,-2,2,-3,3,7,1,2,3,1,2,3,4,5"
    ]
  },
  {
    "question": "W technologii nośników holograficznych wykorzystuje się:",
    "options": [
      "laser czerwony,",
      "laser niebieski,",
      "laser biały,",
      "laser zielony,"
    ],
    "correct": [
      "laser zielony,",
      "laser czerwony,"
    ]
  },
  {
    "question": "Utrata synchronizacji to sytuacja w znakowaniu wodnym, kiedy:",
    "options": [
      "znak wodny jest obecny ale nie może zostać wykryty,",
      "obraz po dodaniu znaku wodnego staje się nieczytelny,",
      "znak wodny przestaje korelować z obrazem,",
      "znak wodny jest usuwany, ale jakość obrazu znacząco spada,"
    ],
    "correct": [
      "znak wodny jest obecny ale nie może zostać wykryty,"
    ]
  },
  {
    "question": "Maskowanie w modelu psychoakustycznym dotyczy m.in.:",
    "options": [
      "Maskowania szumem dźwięków słyszalnych",
      "Zagłuszania wybranych dźwięków po sobie następujących w określonych warunkach",
      "Maskowania sąsiednich częstotliwości/ dźwięków w obecności innych dźwięków",
      "Maskowania częstotliwości mowy przez odpowiednią muzykę"
    ],
    "correct": [
      "Maskowania sąsiednich częstotliwości/ dźwięków w obecności innych dźwięków",
      "Zagłuszania wybranych dźwięków po sobie następujących w określonych warunkach"
    ]
  },
  {
    "question": "Kompensacja ruchu to:",
    "options": [
      "Algorytm redukcji drgań w zapisie video",
      "Usuwanie obiektów ruchomych ze strumienia video",
      "Sposób zapisu wektorów przesunięć"
    ],
    "correct": [
      "Sposób zapisu wektorów przesunięć"
    ]
  },
  {
    "question": "Cele cyfrowego znakowania wodnego:",
    "options": [
      "śledzenie transakcji,",
      "zabezpieczenie przed nieuprawnionym dostępem,",
      "ochrona praw autorskich,",
      "uwierzytelnianie treści,",
      "ukrycie tajnej komunikacji,"
    ],
    "correct": [
      "ochrona praw autorskich,",
      "śledzenie transakcji,",
      "uwierzytelnianie treści,"
    ]
  },
  {
    "question": "Zalety zapisu dźwięku w formacie float to:",
    "options": [
      "znormalizowany zapis próbek w zakresie od -1.0 do 1.0",
      "brak niebezpieczeństwa przesterowania cyfrowego podczas wykonywania obliczeń",
      "mniejsze zużycie pamięci niż w przypadku liczb typu long int",
      "możliwość zapisu wielokanałowego w pojedynczej próbce"
    ],
    "correct": [
      "brak niebezpieczeństwa przesterowania cyfrowego podczas wykonywania obliczeń",
      "znormalizowany zapis próbek w zakresie od -1.0 do 1.0"
    ]
  },
  {
    "question": "Klatki typu P przechowują informację...",
    "options": [
      "Zrekonstruowaną z wektorów ruchu i klatek typu B",
      "Różnicową",
      "Całkowitą o obrazie",
      "Wynikającą z sąsiadujących klatek I"
    ],
    "correct": [
      "Wynikającą z sąsiadujących klatek I",
      "Różnicową"
    ]
  },
  {
    "question": "Scentralizowany system VOD charakteryzuje się:",
    "options": [
      "dużą przepustowością",
      "łatwością zarządzania",
      "dobrą skalowalnością",
      "stosunkowo niską przepustowością"
    ],
    "correct": [
      "stosunkowo niską przepustowością",
      "łatwością zarządzania"
    ]
  },
  {
    "question": "Modulacja EFM stosowana w zapisie CD-ROM oznacza, że:",
    "options": [
      "do 8 bitów wejściowych dodaje się 4 bity parzystości,",
      "14 bitów wejściowych uzupełnianych jest 8 bitami parzystości,",
      "8 bitów wejściowych jest zastępowane 14 bitami wyjściowymi,",
      "8 bitów wejściowych jest łączone z 14 bitami, co daje 22 bity na wyjściu,"
    ],
    "correct": [
      "8 bitów wejściowych jest zastępowane 14 bitami wyjściowymi,"
    ]
  },
  {
    "question": "Zaznacz prawdziwe",
    "options": [
      "Integracja dyskretnych i ciągłych danych multimedialnych wymaga dodatkowych usług systemu operacyjnego",
      "Multimedialny system operacyjny nie uwzględnia ograniczeń czasowych ale zapewnia gwarancje obsługi",
      "System operacyjny zapewnia wygodne środowisko do wykonywania programów i efektywne wykorzystanie sprzętu komputerowego",
      "Aplikacje multimedialne wymagają dużej liczby manipulacji danymi"
    ],
    "correct": [
      "System operacyjny zapewnia wygodne środowisko do wykonywania programów i efektywne wykorzystanie sprzętu komputerowego",
      "Aplikacje multimedialne wymagają dużej liczby manipulacji danymi",
      "Integracja dyskretnych i ciągłych danych multimedialnych wymaga dodatkowych usług systemu operacyjnego"
    ]
  },
  {
    "question": "PhotoStimulating Luminescence pozwala na",
    "options": [
      "budowę obrazów radiograficznych",
      "rejestrację promieniowana X w cyfrowych urządzeniach medycznych",
      "pomiar energii przenoszonej przez promieniowanie cieplne",
      "wykrywanie obiektów o naturalnej luninescencji w obrazach mikroskopowych"
    ],
    "correct": [
      "rejestrację promieniowana X w cyfrowych urządzeniach medycznych",
      "budowę obrazów radiograficznych"
    ]
  },
  {
    "question": "Kodowanie Huffmana jest",
    "options": [
      "Metodą zmniejszania szumów w strumieniach audio",
      "Metodą kompresji stratnej lub bezstratnej w zależności od danych",
      "Metodą kompresji stratnej",
      "Metodą kompresji bezstratnej",
      "Metodą kodowania sygnału stereo w strumieniu mono"
    ],
    "correct": [
      "Metodą kompresji bezstratnej"
    ]
  },
  {
    "question": "Szum kwantyzacji obniża się",
    "options": [
      "wraz ze wzrostem głebokości bitowej rejestrowanego dźwięku",
      "nie zależy od głębokości bitowej rejestrowanego dźwięku",
      "wraz ze zmniejszeniem się głebokości bitowej rejestrowanego dźwięku"
    ],
    "correct": [
      "wraz ze wzrostem głebokości bitowej rejestrowanego dźwięku"
    ]
  },
  {
    "question": "Aktywne zasoby w systemie operacyjnym to",
    "options": [
      "CPU",
      "karta sieciowa",
      "pasmo transmisji sieciowej",
      "pamięć operacyjna"
    ],
    "correct": [
      "CPU",
      "karta sieciowa"
    ]
  },
  {
    "question": "Binning pozwala na",
    "options": [
      "wzmocnienie prądu odczytywanego z pojedynczego piksela matrycy światłoczułej",
      "zwiększenie rozdzielczości przestrzennej obrazu",
      "rejestrowanie obrazów w słabym oświetleniu",
      "łączenie pikseli w matrycy w celu zmniejszenia poziomu szumu w obrazie"
    ],
    "correct": [
      "rejestrowanie obrazów w słabym oświetleniu",
      "łączenie pikseli w matrycy w celu zmniejszenia poziomu szumu w obrazie"
    ]
  },
  {
    "question": "MDCT (modified DCT) pozwala na",
    "options": [
      "Działanie na danych w skali logarytmicznej",
      "Obliczanie jedynie połowy współczynników widma DCT dla zwiększenia szybkości działania",
      "Zmniejszenie zniekształceń na granicach ramek audo w kompresji stratnej",
      "Realizację przekształcenia na blokach nachodzących na siebie w czasie"
    ],
    "correct": [
      "Zmniejszenie zniekształceń na granicach ramek audo w kompresji stratnej",
      "Realizację przekształcenia na blokach nachodzących na siebie w czasie"
    ]
  },
  {
    "question": "Typowy rozmiar skompresowanych ramek P w kompresji wideo...",
    "options": [
      "jest znacznie mniejszy niż ramek I",
      "zależy silnie od ramek B",
      "nie zależy od ramek I",
      "jest znacznie większy niż ramek B"
    ],
    "correct": [
      "jest znacznie mniejszy niż ramek I",
      "jest znacznie większy niż ramek B"
    ]
  },
  {
    "question": "Elementy 'bezstratne' algorytmu kompresji JPEG to",
    "options": [
      "kwantyzację",
      "podział na bloki 8x8",
      "skanowanie zig-zag",
      "subsampling kolorów"
    ],
    "correct": [
      "podział na bloki 8x8",
      "skanowanie zig-zag"
    ]
  },
  {
    "question": "Wyróżniamy następujące znaczenia komunikatu:",
    "options": [
      "wirtualne (domniemane)",
      "pierwotne (założenie, projekt)",
      "zewnętrzne (zakładane)",
      "wtórne (odbiór, subiektywne)",
      "wewnętrzne (prawdziwe, obiektywne)"
    ],
    "correct": [
      "pierwotne (założenie, projekt)",
      "wtórne (odbiór, subiektywne)",
      "wewnętrzne (prawdziwe, obiektywne)"
    ]
  },
  {
    "question": "Kodeki parametryczne w kodowaniu mowy wykorzystują",
    "options": [
      "analizę parametrów mowy",
      "transmisję parametrów modelu",
      "model statystyczny sygnału",
      "pasmo 20Hz - 20 kHz",
      "syntezę mowy na podstawie otrzymanych parametrów"
    ],
    "correct": [
      "analizę parametrów mowy",
      "transmisję parametrów modelu",
      "syntezę mowy na podstawie otrzymanych parametrów"
    ]
  },
  {
    "question": "Ze względu na zastosowany typ przetwornika elektroakustycznego, wyróżniamy mikrofony:",
    "options": [
      "piezoelektryczne",
      "elektrostatyczne",
      "laserowe",
      "stykowe",
      "kwasowe",
      "suche",
      "mokre",
      "węglowe",
      "magnetoelektryczne",
      "dynamiczne"
    ],
    "correct": [
      "kwasowe",
      "węglowe",
      "stykowe",
      "piezoelektryczne",
      "dynamiczne",
      "magnetoelektryczne",
      "laserowe",
      "elektrostatyczne"
    ]
  },
  {
    "question": "W typowym przypadku cyfrowej transmisji TV w pojedynczym kanale mozna przesłać około:",
    "options": [
      "1 program",
      "10 programów",
      "16 programów",
      "4 programy"
    ],
    "correct": [
      "10 programów"
    ]
  },
  {
    "question": "Najmniej zasobów po stronie komputera odbiorcy angażuje w cloud gamingu metoda:",
    "options": [
      "Peer-to-Peer (P2P)",
      "Game streaming (GS)",
      "Progresywne pobieranie (PD - Progressive download)"
    ],
    "correct": [
      "Game streaming (GS)"
    ]
  },
  {
    "question": "Oko ludzkie jest czułe na barwy w następujących proporcjach:",
    "options": [
      "Czerwony 33%, Zielony 33%, Niebieski 33%",
      "Czerwony 30%, Zielony 60%, Niebieski 10%",
      "Czerwony 50%, Zielony 40%, Niebieski 10%",
      "Czerwony 10%, Zielony 30%, Niebieski 60%"
    ],
    "correct": [
      "Czerwony 30%, Zielony 60%, Niebieski 10%"
    ]
  },
  {
    "question": "Nośnikiem optycznym NIE JEST:",
    "options": [
      "Streamer,",
      "GD-ROM,",
      "Pamięć bębnowa,",
      "Blu-ray,",
      "OTP ROM,"
    ],
    "correct": [
      "Streamer,",
      "Pamięć bębnowa,",
      "OTP ROM,"
    ]
  },
  {
    "question": "Kodowanie Huffmana dla ciągu 123123123...",
    "options": [
      "Da dużą oszczędność miejsca",
      "Zwiększy zapotrzebowanie na miejsce potrzebne do zapisania formy zakodowanej",
      "Nie zmieni objętości danych zakodowanych w stosunku do oryginalnych"
    ],
    "correct": [
      "Zwiększy zapotrzebowanie na miejsce potrzebne do zapisania formy zakodowanej"
    ]
  },
  {
    "question": "Zaznacz prawidłowe:",
    "options": [
      "Treść linearna wymaga kontroli nawigacyjnej ze strony odbiorcy",
      "Przykładem treści linearnej jest np. przekaz kinowy",
      "Treść nielinearna to treść hipermedialna",
      "Treść nielinearna oferuje interaktywność"
    ],
    "correct": [
      "Treść nielinearna oferuje interaktywność",
      "Treść nielinearna to treść hipermedialna",
      "Przykładem treści linearnej jest np. przekaz kinowy"
    ]
  },
  {
    "question": "Kwantyzacja BTC",
    "options": [
      "zachowuje średnią wartości pikseli w blokach",
      "jest metodą stratnej kompresji obrazu",
      "pracuje wyłącznie na obrazach dwupoziomowych",
      "zachowuje wariancję wartości pikseli w blokach",
      "dokonuje dwupoziomowej kwantyzacji w blokach obrazu"
    ],
    "correct": [
      "dokonuje dwupoziomowej kwantyzacji w blokach obrazu",
      "zachowuje średnią wartości pikseli w blokach",
      "zachowuje wariancję wartości pikseli w blokach",
      "jest metodą stratnej kompresji obrazu"
    ]
  },
  {
    "question": "Różnica pomiędzy CCD a CMOS w matrycach światłoczułych polega na tym, iż",
    "options": [
      "w matrycach CMOS konwersja ładunku na napięcie odbywa się w każdym pikselu matrycy",
      "odczyt wartości z matrycy CMOS odbywa się w jednym kroku",
      "odczyt wartości z matrycy CMOS odbywa się na wierszami",
      "w matrycach CMOS konwersja ładunku na napięcie odbywa się poprzez pojedynczą konwersję dla całej matrycy"
    ],
    "correct": [
      "w matrycach CMOS konwersja ładunku na napięcie odbywa się w każdym pikselu matrycy",
      "odczyt wartości z matrycy CMOS odbywa się w jednym kroku"
    ]
  },
  {
    "question": "Metoda podwójnej ślepej próby (test ABC) w ocenie jakości dźwięku wykorzystuje",
    "options": [
      "dowolną liczbę sygnałów, przy założeniu, że tylko jeden jest referencyjny",
      "4 sygnały",
      "3 sygnały",
      "2 sygnały"
    ],
    "correct": [
      "3 sygnały"
    ]
  },
  {
    "question": "Skrót 4CC oznacza",
    "options": [
      "format kompresji czwórkowej obrazu statycznego",
      "algorytm korekcji błędów z czterema bitami nadmiarowymi",
      "format zapisu liczb 32-bitowych w procesorach sygnałowych",
      "identyfikator przestrzeni barwnej wykorzystywanej w plikach video"
    ],
    "correct": [
      "identyfikator przestrzeni barwnej wykorzystywanej w plikach video"
    ]
  },
  {
    "question": "Stała przepływność",
    "options": [
      "Stosuje stałą liczbę bitów dla maksymalnej amplitudy sygnału",
      "Zapisuje określony fragment nagrania zawsze przy pomocy tej samej liczby bitów, niezależnie od stopnia skomplikowania zapisywanych danych",
      "Gwarantuje wypełnienie określonego pasma transmisyjnego",
      "Zapisuje określony fragment nagrania przy pomocy różnej liczby bitów, zależnie od stopnia skomplikowania"
    ],
    "correct": [
      "Zapisuje określony fragment nagrania zawsze przy pomocy tej samej liczby bitów, niezależnie od stopnia skomplikowania zapisywanych danych",
      "Gwarantuje wypełnienie określonego pasma transmisyjnego"
    ]
  },
  {
    "question": "Cechy mikrofonów węglowych:",
    "options": [
      "duża skuteczność",
      "małe zniekształcenia",
      "mały poziom szumu",
      "duży poziom szumu",
      "nieograniczone pasmo przenoszenia",
      "duże zniekształcenia"
    ],
    "correct": [
      "duży poziom szumu",
      "duże zniekształcenia",
      "duża skuteczność"
    ]
  },
  {
    "question": "metoda znakowania wodnego na bazie LSB wykorzystuje:",
    "options": [
      "niskie częstotliwości widma FFT obrazu,",
      "składowe jasności w modelu HSB,",
      "najbardziej znaczące bity słowa opisującego piksel,",
      "najmniej znaczące bity słowa opisującego piksel"
    ],
    "correct": [
      "najmniej znaczące bity słowa opisującego piksel"
    ]
  },
  {
    "question": "kompensacja ruchu wykorzystuje:",
    "options": [
      "mechanizmy przeszukiwania (pełny i logarytmiczny)",
      "ocenę błędu MAE",
      "wykrywanie błędów predykcji",
      "zmianę kroku kwantyzacji współczynników DCT"
    ],
    "correct": [
      "mechanizmy przeszukiwania (pełny i logarytmiczny)",
      "ocenę błędu MAE"
    ]
  },
  {
    "question": "Kodowanie danych ma na celu:",
    "options": [
      "ograniczenie dostępu poprzez szyfrowanie,",
      "ujednolicenie formy danych dla różnych kanałów transmisyjnych",
      "zmniejszenie objętości poprzez kompresję,",
      "poprawę jakości transmisji przez korekcję błędów,"
    ],
    "correct": [
      "poprawę jakości transmisji przez korekcję błędów,",
      "zmniejszenie objętości poprzez kompresję,",
      "ograniczenie dostępu poprzez szyfrowanie,"
    ]
  },
  {
    "question": "Cechą charakterystyczną redundancji informacyjnej jest...",
    "options": [
      "Wysoka entropia strumienia danych",
      "Losowy rozkład symboli w ciągu danych",
      "Niska entropia strumienia danych",
      "Częste powtarzanie się symboli w ciągu danych"
    ],
    "correct": [
      "Niska entropia strumienia danych",
      "Częste powtarzanie się symboli w ciągu danych"
    ]
  },
  {
    "question": "Subsampling (opisywany np. jako 4:2:2) stosowany w JPEG i MPEG dotyczy:",
    "options": [
      "Kwantyzacji współczynników transformaty DCT w kolejnych blokach obrazu",
      "Stosunku liczby zapamiętanych w obrazie pikseli luminancji i chrominancji",
      "Proporcji liczby klatek I, P i B",
      "Stosunku wielkości bloków w algorytmie estymacji ruchu"
    ],
    "correct": [
      "Stosunku liczby zapamiętanych w obrazie pikseli luminancji i chrominancji"
    ]
  },
  {
    "question": "W modelu data-pull dla interfejsu dźwiękowego",
    "options": [
      "brak jest synchronizacji z zegarem interfejsu",
      "jest dostępna synchronizacja z zegarem interfejsu",
      "synchronizacja zależy od tego, czy odtwarzamy, czy nagrywamy dźwięk"
    ],
    "correct": [
      "synchronizacja zależy od tego, czy odtwarzamy, czy nagrywamy dźwięk"
    ]
  },
  {
    "question": "QuadBayer to nazwa",
    "options": [
      "matrycy kolorowej o 4 filtrach kolorystycznych (w przeciwieństwie do typowych 3 filtrów)",
      "metody zwiększania czułości i efektywności kwantowej w przypadku słabego oświetlenia",
      "specjalnego sensora o rozdzielczości przestrzennej 4x większej niż zwykłe sensory",
      "specjalnego sensora o rozdzielczości przestrzennej 4x mniejszej niż zwykłe sensory"
    ],
    "correct": [
      "specjalnego sensora o rozdzielczości przestrzennej 4x większej niż zwykłe sensory",
      "metody zwiększania czułości i efektywności kwantowej w przypadku słabego oświetlenia"
    ]
  },
  {
    "question": "Komunikat wizualny obejmuje (zawiera) m.in.:",
    "options": [
      "obraz, kolor",
      "spostrzeżenie, informację",
      "gest, ruch",
      "sygnał, bodziec",
      "wrażenie, wiadomość"
    ],
    "correct": [
      "sygnał, bodziec",
      "spostrzeżenie, informację",
      "wrażenie, wiadomość"
    ]
  },
  {
    "question": "Zmienna przepływność",
    "options": [
      "Dopasowuje liczbę bitów do maksymalnej aplitudy sygnału",
      "Zapisuje określony fragment nagrania przy pomocy różnej liczby bitów, zależnie od stopnia skomplikowania",
      "Zapisuje określony fragment nagrania zawsze przy pomocy tej samej liczby bitów, niezależnie od stopnia skomplikowania zapisywanych danych",
      "Gwarantuje utrzymanie stałej jakości sygnału wyjściowego, nie zaś stałej ilości danych przypadających na daną jednostkę czasu"
    ],
    "correct": [
      "Zapisuje określony fragment nagrania przy pomocy różnej liczby bitów, zależnie od stopnia skomplikowania",
      "Gwarantuje utrzymanie stałej jakości sygnału wyjściowego, nie zaś stałej ilości danych przypadających na daną jednostkę czasu"
    ]
  },
  {
    "question": "Pakiety w transmisji cyfrowej TV poddaje się tzw. randomizacji aby:",
    "options": [
      "zabezpieczyć przed wysyłaniem pozornie niemodulowanej fali nośnej",
      "zaszyfrować przekaz",
      "rozproszyć energię sygnału",
      "zwiększyć odporność przekazu na zakłócenia"
    ],
    "correct": [
      "rozproszyć energię sygnału",
      "zabezpieczyć przed wysyłaniem pozornie niemodulowanej fali nośnej",
      "zwiększyć odporność przekazu na zakłócenia"
    ]
  },
  {
    "question": "Na odbiór danej barwy wpływ ma wiele bodźców, m. in.:",
    "options": [
      "skład widmowy promieniowania",
      "samopoczucie odbiorcy odczuwane danego dnia",
      "obecność innych barw w pobliżu",
      "ilość energii świetlnej",
      "liczba równoczesnych odbiorców"
    ],
    "correct": [
      "skład widmowy promieniowania",
      "ilość energii świetlnej",
      "obecność innych barw w pobliżu",
      "samopoczucie odbiorcy odczuwane danego dnia"
    ]
  },
  {
    "question": "Zniekształcenia strukturalne w ocenie jakości obrazu to m.in.",
    "options": [
      "zmiana jasności",
      "przesunięcie wszystkich pikseli w macierzy obrazu",
      "rozmycie",
      "zaszumienie",
      "kompresja stratna oparta na falkach",
      "kompresja stratna typu JPEG",
      "zmiana kontrastu",
      "zmiana współczynnika gamma"
    ],
    "correct": [
      "zaszumienie",
      "rozmycie",
      "kompresja stratna typu JPEG",
      "kompresja stratna oparta na falkach"
    ]
  },
  {
    "question": "Wyższa częstotliwość próbkowania pozwala na",
    "options": [
      "poszerzenie zakodowanego pasma częstotliwości",
      "zawężenie zakodowanego pasma częstotliwości",
      "nie wpływa na szerokość pasma zakodowanego dźwięku"
    ],
    "correct": [
      "poszerzenie zakodowanego pasma częstotliwości"
    ]
  },
  {
    "question": "Podstawowe zalety systemów ARQ (Automatic Repeat Request) to:",
    "options": [
      "zwiększenie szybkości i efektywności transmisji",
      "operacja detekcji błędów może być zrealizowana w prosty i szybki sposób",
      "brak konieczności buforowania danych",
      "dane przekazywane użytkownikowi końcowemu są pozbawione błędów"
    ],
    "correct": [
      "dane przekazywane użytkownikowi końcowemu są pozbawione błędów",
      "operacja detekcji błędów może być zrealizowana w prosty i szybki sposób"
    ]
  },
  {
    "question": "Algorytmy RLE i ByteRun umożliwiają",
    "options": [
      "Kompresję prostych obrazów",
      "Eliminację redundancji informacyjnej w postaci powtarzających się bajtów",
      "Skalowanie obrazu z interpolacją",
      "Próbkowanie co drugiego bajtu odpowiedzialnego za kolor w algorytmie JPEG"
    ],
    "correct": [
      "Eliminację redundancji informacyjnej w postaci powtarzających się bajtów",
      "Kompresję prostych obrazów"
    ]
  },
  {
    "question": "Percepcja to:",
    "options": [
      "mechanizm stratnej kompresji dźwięku i obrazu",
      "organizacja i interpretacja wrażeń zmysłowych, w celu zrozumienia otoczenia",
      "zdolność wzroku do skupienia ostrości na wybranym punkcie",
      "metoda oceny jakości obrazu lub dźwięku"
    ],
    "correct": [
      "organizacja i interpretacja wrażeń zmysłowych, w celu zrozumienia otoczenia"
    ]
  },
  {
    "question": "Model barw YCbCr używany jest w kompresji obrazów ponieważ:",
    "options": [
      "Jest to przestrzeń bardziej percepcyjnie jednorodna niż RGB",
      "Obliczenia w nim są szybsze niż w RGB",
      "Kolory w nim są odwzorowane z większą dokładnością",
      "Dzięki rozdzieleniu luminancji od chrominancji można uzyskać wyższy stopień kompresji"
    ],
    "correct": [
      "Dzięki rozdzieleniu luminancji od chrominancji można uzyskać wyższy stopień kompresji"
    ]
  },
  {
    "question": "Kompresja fraktalna obrazu wykorzystuje",
    "options": [
      "kodowanie arytmetyczne",
      "modelowanie tła",
      "filtry splotowe",
      "bloki zakresów (range blocks)",
      "bloki domen (domain blocks)",
      "transformacje afiniczne"
    ],
    "correct": [
      "bloki zakresów (range blocks)",
      "bloki domen (domain blocks)",
      "transformacje afiniczne"
    ]
  },
  {
    "question": "Po wykonaniu algorytmu RLE na ciągu 1,1,1,1,2,2,2,3,3,3,3,1,2,3,1,2,3,4,5 uzyska się następujący wynik:",
    "options": [
      "4,1,3,2,4,3,0,8,1,2,3,1,2,3,4,5,0",
      "-5,1,-3,2,-3,3,8,1,2,3,1,2,3,4,5",
      "4,1,3,2,4,3,0,8,1,2,3,1,2,3,4,5",
      "-5,1,-3,2,-3,3,8,1,2,3,1,2,3,4,5,0"
    ],
    "correct": [
      "4,1,3,2,4,3,0,8,1,2,3,1,2,3,4,5,0"
    ]
  },
  {
    "question": "profile MPEG",
    "options": [
      "podzbiory składni, dzięki którym dekodery pracujące w pewnym określonym obszarze nie muszą obsługiwać wszystkich założonych w standardzie funkcji",
      "definiują kryteria wyszukiwania w bazach wideo",
      "są ułożone hierarchicznie",
      "określają rodzaj materiału wideo, który podlega kompresji (dymanika sceny, złożoność obiektów, liczba kolorów)"
    ],
    "correct": [
      "podzbiory składni, dzięki którym dekodery pracujące w pewnym określonym obszarze nie muszą obsługiwać wszystkich założonych w standardzie funkcji",
      "są ułożone hierarchicznie"
    ]
  },
  {
    "question": "Algorytmy kodowania bez analizy całego zbioru danych to m.in.:",
    "options": [
      "LZ77",
      "LZW",
      "Kodowanie arytmetyczne",
      "Kodowanie Huffmana",
      "ByteRun",
      "RLE"
    ],
    "correct": [
      "ByteRun",
      "RLE",
      "LZW",
      "LZ77"
    ]
  },
  {
    "question": "Proszę zaznaczyć technologie realizujące koncepcję IBB:",
    "options": [
      "HbbTV",
      "HybridCast",
      "DAB+",
      "DRM"
    ],
    "correct": [
      "HybridCast",
      "HbbTV"
    ]
  },
  {
    "question": "Jak nazywa się mechanizm ochrony dysków SSD przed zbyt szybkim zużyciem:",
    "options": [
      "Multi-level cell protection,",
      "Wear-leveling,",
      "Error Correction Code,",
      "Kerr effect,"
    ],
    "correct": [
      "Wear-leveling,"
    ]
  },
  {
    "question": "Zaznacz metody/standardy stratnej kompresji dźwięku",
    "options": [
      "APE",
      "AAC",
      "ALAC",
      "ADPCM",
      "A-Law",
      "MP3",
      "FLAC"
    ],
    "correct": [
      "A-Law",
      "ADPCM",
      "AAC",
      "MP3"
    ]
  },
  {
    "question": "Pasywne zasoby w systemie operacyjnym to",
    "options": [
      "pasmo systemu plików",
      "CPU",
      "karta sieciowa",
      "pamięć operacyjna",
      "pasmo transmisji sieciowej"
    ],
    "correct": [
      "pamięć operacyjna",
      "pasmo transmisji sieciowej",
      "pasmo systemu plików"
    ]
  },
  {
    "question": "Zaznacz metody/standardy bezstratnej kompresji obrazu",
    "options": [
      "JPEG2000",
      "JBIG",
      "JPEG-LS",
      "CALIC",
      "GIF"
    ],
    "correct": [
      "JBIG",
      "JPEG-LS",
      "CALIC",
      "GIF"
    ]
  },
    {
        "question": "Zmienna przepływność",
        "options": [
            "Zapisuje określony fragment nagrania przy pomocy różnej liczby bitów, zależnie od stopnia skomplikowania",
            "Gwarantuje utrzymanie stałej jakości sygnału wyjściowego, nie zaś stałej ilości danych przypadających na daną jednostkę czasu",
            "Zapisuje określony fragment nagrania zawsze przy pomocy tej samej liczby bitów, niezależnie od stopnia skomplikowania zapisywanych danych",
            "Dopasowuje liczbę bitów do maksymalnej aplitudy sygnału"
        ],
        "correct": [
            "Zapisuje określony fragment nagrania przy pomocy różnej liczby bitów, zależnie od stopnia skomplikowania",
            "Gwarantuje utrzymanie stałej jakości sygnału wyjściowego, nie zaś stałej ilości danych przypadających na daną jednostkę czasu"
        ]
    },
    {
        "question": "Kompresja stratna obrazu jest możliwa m.in. dzięki:",
        "options": [
            "Niedoskonałości ludzkiego wzroku",
            "Niskiej rozdzielczości współczesnych monitorów",
            "Transformacji do dziedziny częstotliwości i kwantyzacji współczynników widma",
            "Szumom wprowadzanym przez sensory CCD/CMOS"
        ],
        "correct": [
            "Niedoskonałości ludzkiego wzroku",
            "Transformacji do dziedziny częstotliwości i kwantyzacji współczynników widma"
        ]
    },
    {
        "question": "Cechą wspólną algorytmów JPEG2000, WSQ i DjVu jest to, że",
        "options": [
            "działają na obrazach wielopoziomowych",
            "dzielą obraz na bloki 8x8",
            "wykorzystują transformatę falkową",
            "dokonują segmentacji tła"
        ],
        "correct": [
            "działają na obrazach wielopoziomowych",
            "wykorzystują transformatę falkową"
        ]
    },
    {
        "question": "Wielkość pojedynczego piksela w typowej matrycy CCD jest w przedziale",
        "options": [
            "3 - 25 mikrometrów",
            "0.2 - 0.5 nanometra",
            "3 - 25 nanometrów",
            "0.2 - 0.5 milimetra"
        ],
        "correct": [
            "3 - 25 mikrometrów"
        ]
    },
    {
        "question": "Długość fali lasera dla nośników CD-ROM jest:",
        "options": [
            "dłuższa niż dla DVD-ROM,",
            "krótsza niż dla DVD-ROM,",
            "pomiędzy DVR-ROM a DVD-RW,",
            "taka sama jak dla DVD-ROM,"
        ],
        "correct": [
            "dłuższa niż dla DVD-ROM,"
        ]
    },
    {
        "question": "Dla dowolnego obrazka kolorowego zapisanego z dokładnością 8-bitową alfabet kompresora LZW...",
        "options": [
            "Może zawierać maksymalnie 256 symboli",
            "Będzie równy liczbie symboli w słowniku",
            "Będzie zawierał więcej niż 256 symboli"
        ],
        "correct": [
            "Może zawierać maksymalnie 256 symboli"
        ]
    }
]

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedSummaryQuestion, setSelectedSummaryQuestion] = useState(null);
  const [score, setScore] = useState(0);

 
  const shuffledQuestions = useMemo(() => {
    if (!startQuiz) return [];
    return questions.map(q => ({
      ...q,
      options: shuffle(q.options),
    }));
  }, [questions, startQuiz]);


  const handleNumQuestionsChange = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= allQuestions.length) {
      setNumQuestions(value);
    }
  };

  const handleStartQuiz = () => {
    const selectedQuestions = shuffle(allQuestions).slice(0, numQuestions);
    setQuestions(selectedQuestions);
    setAnswers(new Array(numQuestions).fill(null));
    setCurrentQuestion(0);
    setShowResult(false);
    setStartQuiz(true);
  };

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    const currentAnswer = newAnswers[currentQuestion];
    const existingSelections = currentAnswer?.selected || [];
    
    const optionPosition = existingSelections.indexOf(optionIndex);
    let newSelections;

    if (optionPosition > -1) {
      newSelections = existingSelections.filter(item => item !== optionIndex);
    } else {
      newSelections = [...existingSelections, optionIndex];
    }

    newAnswers[currentQuestion] = {
      ...shuffledQuestions[currentQuestion],
      selected: newSelections.sort((a, b) => a - b),
    };

    setAnswers(newAnswers);
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      endQuiz(true); 
    }
  };

  const endQuiz = (force = false) => {
    const calculateAndSetScore = () => {
      let calculatedScore = 0;
      answers.forEach((answer, index) => {
        if (!answer || !answer.selected?.length) return; 

        const question = shuffledQuestions[index];
        const correctOptions = question.correct;
        const selectedOptions = answer.selected.map(i => question.options[i]);

        const isCorrect = JSON.stringify(correctOptions.sort()) === JSON.stringify(selectedOptions.sort());
        
        if (isCorrect) {
          calculatedScore++;
        }
      });
      setScore(calculatedScore);
      setShowResult(true);
    };

    if (force || window.confirm("Czy na pewno chcesz zakończyć quiz?")) {
        calculateAndSetScore();
    }
  };
  
  const handleRestartQuiz = () => {
    setStartQuiz(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setQuestions([]);
    setSelectedSummaryQuestion(null);
  };


  if (!startQuiz) {
    return (
      <div className="quiz-container">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold">Wybierz liczbę pytań:</h2>
          <p className="text-gray-600">Dostępnych pytań: {allQuestions.length}</p>
          <input
            type="number"
            value={numQuestions}
            min="1"
            max={allQuestions.length}
            onChange={handleNumQuestionsChange}
            className="p-2 border border-gray-400 rounded-md w-24 mt-2"
          />
          <Button className="mt-4" onClick={handleStartQuiz}>
            Rozpocznij quiz
          </Button>
        </Card>
      </div>
    );
  }

  const checkIsCorrect = (answer, question) => {
      if (!answer || !answer.selected?.length || !question) return false;
      const correctOptions = question.correct;
      const selectedOptions = answer.selected.map(i => question.options[i]);
      return JSON.stringify(correctOptions.sort()) === JSON.stringify(selectedOptions.sort());
  }

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        {showResult ? (
          <Card className="p-6 text-center">
            <h2 className="text-xl font-bold">
              Twój wynik: {score} / {shuffledQuestions.length} ({((score / shuffledQuestions.length) * 100).toFixed(2)}%)
            </h2>
            {selectedSummaryQuestion !== null ? (
              <div className="question-detail">
                <h3 className="text-lg font-bold">{shuffledQuestions[selectedSummaryQuestion]?.question}</h3>
                {answers[selectedSummaryQuestion] ? (
                  <>
                    <p><strong>Twoja odpowiedź:</strong> {
                      answers[selectedSummaryQuestion].selected.length > 0
                        ? answers[selectedSummaryQuestion].selected.map(i => answers[selectedSummaryQuestion].options[i]).join(', ')
                        : "Brak odpowiedzi"
                    }</p>
                    <p><strong>Poprawna odpowiedź:</strong> {answers[selectedSummaryQuestion].correct.join(', ')}</p>
                  </>
                ) : (
                  <>
                    <p style={{ color: "red", fontWeight: "bold" }}>Nie odpowiedziałeś na to pytanie.</p>
                    <p><strong>Poprawna odpowiedź:</strong> {shuffledQuestions[selectedSummaryQuestion]?.correct.join(', ')}</p>
                  </>
                )}
                <Button onClick={() => setSelectedSummaryQuestion(null)}>Zamknij</Button>
              </div>
            ) : (
              <p className="info-text">Kliknij pytanie w siatce, aby zobaczyć szczegóły.</p>
            )}
            <Button className="mt-4" onClick={handleRestartQuiz}>Spróbuj ponownie</Button>
          </Card>
        ) : shuffledQuestions.length > 0 ? (
          <Card className="p-6 w-96 fixed-size">
            <CardContent>
              <h3 className="question-counter">Pytanie {currentQuestion + 1} / {shuffledQuestions.length}</h3>
              <h2 className="text-lg font-bold question-text">{shuffledQuestions[currentQuestion]?.question}</h2>
              <div className="options-container">
                {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                  <label key={index} className="option-label">
                    <input
                      type="checkbox"
                      checked={answers[currentQuestion]?.selected?.includes(index) || false}
                      onChange={() => handleAnswer(index)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <div className="navigation-buttons">
                <Button className="nav-button" onClick={() => goToQuestion(currentQuestion - 1)} disabled={currentQuestion === 0}>⬅ Poprzednie</Button>
                <Button className="nav-button" onClick={nextQuestion}>
                  {currentQuestion + 1 === shuffledQuestions.length ? "Zakończ test" : "Następne ➡"}
                </Button>
              </div>
              <Button className="end-button" onClick={() => endQuiz()}>Zakończ quiz teraz</Button>
            </CardContent>
          </Card>
        ) : (
          <p>Ładowanie pytań...</p>
        )}
      </div>

      <div className="summary-grid">
        {shuffledQuestions.map((_, index) => {
          let statusClass = "neutral";
          const answer = answers[index];
          
          if (showResult) {
              if (!answer || !answer.selected?.length) {
                  statusClass = "unanswered";
              } else if (checkIsCorrect(answer, shuffledQuestions[index])) {
                  statusClass = "correct";
              } else {
                  statusClass = "incorrect";
              }
          } else {
              if (answer && answer.selected?.length > 0) {
                  statusClass = "answered";
              }
          }
          if (index === currentQuestion && !showResult) {
              statusClass += " active-question";
          }

          return (
            <div
              key={index}
              className={`summary-box ${statusClass}`}
              onClick={() => (showResult ? setSelectedSummaryQuestion(index) : goToQuestion(index))}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
