import "./App.css";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card/card.jsx";
import { Button } from "./components/ui/button/button.jsx";

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const questions = [
  {
    question: "W grze w naśladownictwo rozważanej przez Turinga bierze udział:",
    options: [
      "1 gracz i 1 pytający",
      "2 graczy i 1 pytający",
      "2 graczy",
      "2 graczy i 2 pytających",
    ],
    correct: 1,
  },
  {
    question: "„Gra w życie” Conwaya jest przykładem:",
    options: [
      "testu Turinga",
      "problemu rozpoznawania wzorców",
      "dwuwymiarowego automatu komórkowego",
      "problemu optymalizacji",
    ],
    correct: 2,
  },
  {
    question:
      "Przez analogię do gry „kółko i krzyżyk” o szachach można powiedzieć, że:",
    options: [
      "są grą nieskończoną, ale rozwiązywalną",
      "są grą skończoną, więc rozwiązywalną",
      "są grą skończoną, ale nierozwiązywalną",
      "są grą nieskończoną, więc nierozwiązywalną",
    ],
    correct: 1,
  },
  {
    question:
      "Algorytm Breadth-first search zanim może odwiedzić węzeł o głębokości d musi najpierw:",
    options: [
      "sprawdzić, czy zbiór Open jest pusty",
      "sprawdzić, czy zbiór Closed jest pusty",
      "odwiedzić wszystkie węzły o głębokości d-1",
      "odwiedzić wszystkie węzły o głębokości d+1",
    ],
    correct: 2,
  },
  {
    question:
      "Algorytmy Breadth-first search i Depth-first search należą do grupy algorytmów przechodzenia grafu w sposób:",
    options: ["heurystyczny", "nieinformacyjny", "zachłanny", "przypadkowy"],
    correct: 1,
  },
  {
    question:
      "Algorytm Dijkstry w każdym węźle (stanie) wykorzystuje tylko informację o:",
    options: [
      "dokładnej przebytej odległości od węzła początkowego",
      "dokładnej odległości pozostałej do węzła końcowego",
      "szacowanej odległości do węzła końcowego",
      "szacowanej przebytej odległości od węzła początkowego",
    ],
    correct: 0,
  },
  {
    question:
      "Realizacja zbioru Open za pomocą kopca binarnego powoduje, że pobranie elementu minimalnego oraz włożenie nowego elementu są o złożonościach odpowiednio:",
    options: [
      "O(1) i O(logn)",
      "O(1) i O(1)",
      "O(logn) i O(logn)",
      "O(logn) i O(1)",
    ],
    correct: 2,
  },
  {
    question:
      "Podmiana (aktualizacja) pewnego stanu w zbiorze Open, realizowanego za pomocą kopca binarnego, wymaga w ogólności kosztu:",
    options: ["O(logn)", "O(n²)", "O(n)", "O(n logn)"],
    correct: 2,
  },
  {
    question:
      "Realizacja zbioru Closed za pomocą mapy haszującej pozwala na operacje odczytywania i dodawania elementów o złożonościach odpowiednio:",
    options: [
      "liniowej i stałej",
      "stałej i zamortyzowanej stałej",
      "stałej i stałej",
      "zamortyzowanej stałej i liniowej",
    ],
    correct: 1,
  },
  {
    question: "Algorytm Best-first search jest:",
    options: [
      "ogólniejszym algorytmem od Breadth-first search",
      "ogólniejszym algorytmem od Depth-first search",
      "szczególnym przypadkiem algorytmu Dijkstry",
      "szczególnym przypadkiem algorytmu A*",
    ],
    correct: 3,
  },
  {
    question:
      "Funkcje heurystyczne używane w algorytmach Best-first search mają za zadanie określać atrakcyjność stanu za pomocą jego:",
    options: [
      "bliskości do stanu docelowego",
      "szacowanej sumy nagród wzdłuż pozostałej ścieżki",
      "odległości od stanu początkowego",
      "sumy nagród zebranej wzdłuż ścieżki",
    ],
    correct: 0,
  },
  {
    question:
      "Heurystyka dopuszczalna to taka, dla której dla wszystkich par s, t zachodzi:",
    options: [
      "h(s) ≤ h(t)",
      "h(s) ≥ d(s,t) + h(t)",
      "g(s) + h(s) ≤ g(t) + h(t)",
      "ƒ(s) ≥ ƒ(t)",
    ],
    correct: 2,
  },
  {
    question:
      "Jeżeli algorytm A* używa jako heurystyki dolnego ograniczenia na odległość do celu, to:",
    options: [
      "jest on wolniejszy niż algorytm Dijkstry",
      "gwarantuje on znalezienie najkrótszej ścieżki",
      "nie gwarantuje on znalezienia najkrótszej ścieżki",
      "nie wymaga on zbioru Closed",
    ],
    correct: 1,
  },
  {
    question: "W układance 'puzzle przesuwne' heurystyka Manhattan:",
    options: [
      "jest mniej dokładna niż heurystyka Misplaced Tiles",
      "jest równa odległości Manhattan kostki pustej do jej miejsca docelowego",
      "jest równa odległości Manhattan kostki n²-1 do jej miejsca docelowego",
      "jest równa sumie odległości Manhattan wszystkich kostek o numerach {1,2,..., n²-1} do ich miejsc docelowych",
    ],
    correct: 3,
  },
  {
    question: "Dla każdego stanu s prawdziwe są nierówności:",
    options: [
      "h3(s) ≤ h2(s) ≤ h1(s)",
      "h1(s) ≤ h3(s) ≤ h2(s)",
      "h2(s) ≤ h3(s) ≤ h1(s)",
      "h1(s) ≤ h2(s) ≤ h3(s)",
    ],
    correct: 3,
  },
  {
    question:
      "W przeszukiwaniu drzew gier dwuosobowych algorytm MIN-MAX przegląda:",
    options: [
      "możliwie najmniej stanów",
      "przynajmniej tyle stanów, co 'przycinanie α-β'",
      "co najwyżej tyle stanów, co 'przycinanie α-β'",
      "stany wg rosnącej głębokości",
    ],
    correct: 1,
  },
  {
    question:
      "Algorytm 'przycinanie α-β' odwiedzi pewien stan, jeżeli aktualnie spełniona jest zależność:",
    options: ["α < β", "α ≤ β", "α > β", "α ≥ β"],
    correct: 0,
  },
  {
    question: "Optymistyczna złożoność 'przycinania α-β' jest rzędu:",
    options: ["O(√(b^D))", "O(b^√D)", "O(b^D)", "O(b^D)"],
    correct: 0,
  },
  {
    question: "Heurystyka materialna stosowana dla szachów oznacza:",
    options: [
      "liczbę ruchów potrzebną do zadania mata",
      "liczbę ruchów potrzebną do dojścia do pola przemiany",
      "różnicę pomiędzy sumą wartości pozostałych bierek białych i czarnych",
      "różnicę pomiędzy sumą wartości zbitych bierek białych i czarnych",
    ],
    correct: 3,
  },
  {
    question:
      "W perceptronie prostym wzór na poprawkę wag można zapisać wzorem:",
    options: [
      "w(k+1) := w(k) + η yᵢ xᵢ",
      "w(k+1) := w(k) η yᵢ + xᵢ",
      "w(k+1) := w(k) η yᵢ xᵢ",
      "w(k+1) := w(k) + η yᵢ + xᵢ",
    ],
    correct: 0,
  },
  {
    question:
      "Granica decyzyjna, którą wyznacza perceptron prosty, jest w ogólności:",
    options: ["prostą", "sferą", "hiperpłaszczyzną", "elipsoidą"],
    correct: 2,
  },
  {
    question:
      "Dowód twierdzenia Novikoffa pokazuje m.in., że iloczyn skalarny wektora wag i wektora optymalnego (w(k), w*) jest w trakcie algorytmu uczenia ograniczony z dołu przez:",
    options: ["√k * const", "k² * const", "k * const", "żadne z powyższych"],
    correct: 2,
  },
  {
    question:
      "Dowód twierdzenia Novikoffa pokazuje m.in., że norma wektora wag ||w(k)|| jest w trakcie algorytmu uczenia ograniczona z góry przez:",
    options: ["√k * const", "k² * const", "k * const", "żadne z powyższych"],
    correct: 0,
  },
  {
    question:
      "Sztuczka 'podnoszenia wymiarowości' w połączeniu z perceptronem prostym ma na celu próbę znalezienia rozwiązania (klasyfikatora) dla zbiorów danych:",
    options: [
      "małej liczby przykładów",
      "dużej liczby przykładów",
      "separowalnych liniowo",
      "nieseparowalnych liniowo",
    ],
    correct: 3,
  },
  {
    question:
      "W perceptronie wielowarstwowym rekurencja 'back-propagation' pozwala obliczyć wartość błędu Ei,j (dla j-tego neuronu w warstwie t) wzorem:",
    options: [
      "Φt,j(1-Φt,k)Σk vt,k,j Et+1,k",
      "Φt,j(1-Φt,k)Σk vt,k,j Et-1,k",
      "Φt,j(1-Φt,k)Σk vt-1,k,j Et-1,k",
      "Φt,j(1-Φt,k)Σk vt-1,k,j Et+1,k",
    ],
    correct: 3,
  },
  {
    question:
      "Sigmoidalna funkcja aktywacji w perceptronie wielowarstwowym określona jest wzorem:",
    options: [
      "Φ(s) = 1 / (1 - exp(s))",
      "Φ(s) = 1 / (1 - exp(-s))",
      "Φ(s) = 1 / (1 + exp(s))",
      "Φ(s) = 1 / (1 + exp(-s))",
    ],
    correct: 3,
  },
  {
    question:
      "Prawdopodobieństwo przejścia osobnika x do następnego pokolenia w selekcji ruletkowej można zapisać wzorem:",
    options: [
      "ƒ(x) / Σt ƒ(t)",
      "rankƒ(x) / Σt rankƒ(t)",
      "ƒ(x) / max t ƒ(t)",
      "ƒ(x) / min t ƒ(t)",
    ],
    correct: 0,
  },
  {
    question:
      "Dany jest dyskretny problem plecakowy o n przedmiotach i objętości plecaka C. Rozwiązanie poprzez programowanie dynamiczne ma złożoność:",
    options: ["O(C^n)", "O(nC)", "O(C+n)", "O(Cn)"],
    correct: 1,
  },
  {
    question:
      "Problem n-hetmanów polega na ustawieniu n hetmanów (bez wzajemnego ataku) na szachownicy o wymiarach:",
    options: ["4×4", "8×8", "n×n", "(n²-1)×(n²-1)"],
    correct: 2,
  },
  {
    question: "'Problem jeepa' jest przykładem problemu:",
    options: [
      "optymalizacji dyskretnej",
      "najkrótszej ścieżki",
      "klasyfikacji binarnej",
      "aproksymacji",
    ],
    correct: 0,
  },
  {
    question: "'Problem komiwojażera' to problem:",
    options: ["NP-zupełny", "NP-trudny", "decyzyjny", "klasyfikacji"],
    correct: 1,
  },
  {
    question:
      "W grze w pojedynczy 'dylemat więźnia' racjonalnym wyborem dla każdego z graczy jest:",
    options: [
      "milczeć",
      "zdradzić",
      "postąpić jak przeciwnik",
      "postąpić odwrotnie niż przeciwnik",
    ],
    correct: 1,
  },
  {
    question:
      "Program komputerowy grający w 'grę w naśladownictwo' nie powinien udzielać:",
    options: [
      "błędnych odpowiedzi",
      "tylko poprawnych odpowiedzi",
      "odpowiedzi po zbyt długim namyśle",
      "odpowiedzi randomizowanych",
    ],
    correct: 1,
  },
  {
    question:
      "Bezpośrednio po wygenerowaniu potomków algorytmy przeszukujące grafy:",
    options: [
      "sprawdzają obecność potomków w zbiorze Open",
      "sprawdzają obecność potomków w zbiorze Closed",
      "sprawdzają monotoniczność heurystyki",
      "sprawdzają dopuszczalność heurystyki",
    ],
    correct: 1,
  },
  {
    question:
      "Stan pobrany ze zbioru Open w algorytmie Best-first-search jest w stosunku do pozostałych stanów w Open stanem o:",
    options: [
      "najmniejszej wartości h(s)",
      "największej wartości h(s)",
      "najmniejszej wartości g(s) + h(s)",
      "największej wartości g(s) + h(s)",
    ],
    correct: 0,
  },
  {
    question:
      "W pewnym algorytmie A* zrealizowano zbiór Open na kopcu binarnym typu MIN. Najbardziej wymagającą operacją jest wówczas:",
    options: [
      "podejrzenie stanu minimalnego",
      "pobranie stanu minimalnego",
      "dodanie stanu",
      "podmiana stanu",
    ],
    correct: 3,
  },
  {
    question: "Sudoku minimalne to sudoku:",
    options: [
      "najmniejszej liczbie danych i 1 rozwiązaniu",
      "najmniejszej liczbie danych i 2 rozwiązaniach",
      "dla planszy 4×4",
      "dla planszy 1×1",
    ],
    correct: 0,
  },
  {
    question:
      "Dla układanki puzzle przesuwne postaci (1,0,5;3,2,4;6,7,8) wartość heurystyki 'Misplaced tiles' wynosi:",
    options: ["2", "3", "4", "5"],
    correct: 3,
  },
  {
    question:
      "Dla układanki puzzle przesuwne postaci (1,0,5;3,2,4;6,7,8) wartość heurystyki 'Manhattan' wynosi:",
    options: ["2", "3", "4", "5"],
    correct: 3,
  },
  {
    question:
      "W pewnym trójwymiarowym labiryncie gracz ma współrzędne (x,y,z) i może wykonywać tylko ruchy (←,→,↑,↓). Miejsce docelowe ma współrzędne (x0,y0,z0). Niech h1(x,y,z)=|x-x0|+|y-y0|+|z-z0| oraz h2(x,y,z)=√((x-x0)²+(y-y0)²+(z-z0)²) oznaczają pewne heurystyki. Prawdziwe jest zdanie:",
    options: [
      "h1 i h2 nie są dopuszczalne",
      "h1 i h2 są dopuszczalne",
      "h1 jest dopuszczalna, h2 jest niedopuszczalna",
      "h2 jest dopuszczalna, h1 jest niedopuszczalna",
    ],
    correct: 1,
  },
  {
    question:
      "Ścieżkę minimalną prowadzącą do rozwiązania puzzli przesuwnych można znaleźć za pomocą:",
    options: [
      "algorytmu Breadth-first-search",
      "algorytmu Best-first-search",
      "algorytmu Dijkstry",
      "żadne z powyższych",
    ],
    correct: 1,
  },
  {
    question:
      "Jeżeli algorytm A* używa jako heurystyki dolnego ograniczenia na odległość do celu, to:",
    options: [
      "jest on wolniejszy niż algorytm Dijkstry",
      "gwarantuje on znalezienie najkrótszej ścieżki",
      "nie gwarantuje on znalezienia najkrótszej ścieżki",
      "nie wymaga on zbioru Closed",
    ],
    correct: 1
  },
  {
    question:
      "Niech b oznacza stały współczynnik rozgałęziania pewnej gry, a D liczbę poziomów drzewa, które chcemy zbadać (D parzyste). Dokładną liczbę stanów odwiedzonych przez algorytm MIN-MAX przedstawia wyrażenie:",
    options: ["b^D", "b^(D/2)", "b^(D+1) - 1", "(b^(D+1) - 1) / (b - 1)"],
    correct: 3,
  },
  {
    question:
      "W przycinaniu α-β analizowany jest pewien stan typu MIN, dla którego procedurę wywołano z początkowymi wartościami α=10, β=15. Przypuśćmy, że wartości zwracane do tego stanu ze stanów potomnych będą wynosiły kolejno 13, -∞, 17, 4, ∞. Przycięcie nastąpi po:",
    options: [
      "pierwszym potomku",
      "drugim potomku",
      "trzecim potomku",
      "czwartym potomku",
    ],
    correct: 1,
  },
  {
    question:
      "W przycinaniu α-β analizowany jest pewien stan typu MAX, dla którego procedurę wywołano z początkowymi wartościami α=10, β=15. Przypuśćmy, że wartości zwracane do tego stanu ze stanów potomnych będą wynosiły kolejno 13, -∞, 17, 4, ∞. Wtedy:",
    options: [
      "przycięcie nie nastąpi wcale",
      "przycięcie nastąpi po tym samym potomku, co w stanie typu MIN z takimi samymi początkowymi i zwracanymi wartościami",
      "przycięcie nastąpi po innym potomku, co w stanie typu MIN z takimi samymi początkowymi i zwracanymi wartościami",
      "stan typu MAX nie może przybrać takich wartości",
    ],
    correct: 2,
  },
  {
    "question": "W perceptronie prostym aktualny wektor wag wynosi (3, 1, -2, 2). Do poprawki wybrano przykład xi = (1, 2, 1, 2). Wynika z tego, że:",
    "options": [
        "yi = -1",
        "yi = 1",
        "nie można wywnioskować klasy",
        "algorytm nie zatrzyma się"
    ],
    "correct": 0
},
  {
    question:
      "W perceptronie prostym aktualny wektor wag wynosi (3, 1, -2, 2). Do poprawki wybrano przykład xi = (1, 2, 1, 2). Współczynnik uczenia wynosi 0.5. Wynika z tego, że nowy wektor wag będzie równy:",
    options: [
      "(-2.5, 0, 2.5, -1)",
      "(2.5, 0, -2.5, 1)",
      "(-3.5, -2, 1.5, -3)",
      "(1.5, 2, -1.5, 3)",
    ],
    correct: 2,
  },
  {
    "question": "Zgodnie z dowodem twierdzenia Novikoffa, jeżeli zbiór danych jest liniowo separowalny, to algorytm perceptronu wykona nie więcej kroków niż:",
    "options": [
        "γ_min² / R_max",
        "R_max / γ_min²",
        "γ_min² / R_max²",
        "R_max² / γ_min²"
    ],
    "correct": 3
},
  {
    question:
      "Pewien zbiór danych określony na płaszczyźnie (w R²) nie jest liniowo separowalny. Dokonano pewnego przekształcenia współrzędnych tego zbioru redukując go do zbioru jednowymiarowego (określonego w R¹). Można powiedzieć, że:",
    options: [
      "nowy zbiór również nie jest liniowo-separowalny",
      "nowy zbiór może być liniowo-separowalny",
      "wspomniane przekształcenie nie jest możliwe",
      "żadne z powyższych",
    ],
    correct: 0,
  },
  {
    question:
      "Jeżeli dla sieci MLP używana jest sigmoidalna funkcja aktywacji Φ(s), to zachodzi związek:",
    options: [
      "Φ(s) = Φ'(s) (1 - Φ'(s))",
      "Φ(s) = -Φ'(s) (1 + Φ'(s))",
      "Φ'(s) = Φ(s) (1 - Φ(s))",
      "Φ'(s) = -Φ(s) (1 + Φ(s))",
    ],
    correct: 2,
  },
  {
    question: "Uczenie sieci MLP w wariancie on-line oznacza, że poprawki wag:",
    options: [
      "następują po obejrzeniu każdego przykładu",
      "następują po obejrzeniu wszystkich przykładów",
      "następują warstwa po warstwie idąc wstecz",
      "następują warstwa po warstwie idąc w przód",
    ],
    correct: 0,
  },
  {
    question:
      "W selekcji ruletkowej wartość oczekiwaną liczby egzemplarzy pewnego osobnika x₁ po selekcji można wyrazić wzorem:",
    options: [
      "(ƒ(xᵢ)) / (Σᵐⱼ=₁ƒ(xⱼ))",
      "(ƒ(xᵢ)) / (1/m Σᵐⱼ=₁ƒ(xⱼ))",
      "(Σᵐⱼ=₁ƒ(xⱼ)) / (ƒ(xᵢ))",
      "(1/m Σᵐⱼ=₁ƒ(xⱼ)) / (ƒ(xᵢ))",
    ],
    correct: 1,
  },
  {
    question:
      "Algorytm Breadth-first search nie może odwiedzić stanu o głębokości d, jeżeli zbiór Open:",
    options: [
      "zawiera stany o głębokości d-1",
      "zawiera stany o głębokości d+1",
      "jest pusty",
      "jest pełny",
    ],
    correct: 0,
  },
  {
    question:
      "Prawdziwe jest następujące zdanie o związku pomiędzy algorytmami A*, Best-first search (BFS) i Dijkstry:",
    options: [
      "A* i BFS są szczególnymi przypadkami algorytmu Dijkstry",
      "A* jest szczególnym przypadkiem BFS",
      "A* i algorytm Dijkstry są szczególnymi przypadkami BFS",
      "BFS i algorytm Dijkstry są szczególnymi przypadkami A*",
    ],
    correct: 3,
  },
  {
    question: "Algorytm A* używa funkcji heurystycznej h, aby:",
    options: [
      "mierzyć odległość przebytą dotychczas",
      "oszacować odległość pozostałą do celu",
      "oszacować sumę odległości",
      "odrzucić już odwiedzone stany",
    ],
    correct: 1,
  },
  {
    question:
      "Jeżeli t jest stanem-potomkiem stanu s(rodzic) w przeszukiwaniu za pomocą A* z heurystyką monotoniczną, wtedy:",
    options: [
      "g(t) ≤ g(s) + h(s)",
      "ƒ(t) ≥ ƒ(s)",
      "g(t) ≥ g(s) + h(s)",
      "ƒ(t) ≤ ƒ(s)",
    ],
    correct: 1,
  },
  {
    question:
      "Jeżeli zbiór Open jest zaimplementowany jako standardowa kolejka FIFO, wtedy czas pobrania (i usunięcia) elementu minimalnego jest:",
    options: ["logarytmiczny", "stały", "liniowy", "żadne z powyższych"],
    correct: 2,
  },
  {
    question:
      "Jeżeli zbiór Open jest zaimplementowany jako kolejka priorytetowa (na kopcu binarnym) i zawiera n elementów, wówczas pobranie (i usunięcie) elementu minimalnego wymaga czasu:",
    options: ["O(n)", "O(1)", "O(log₂n)", "O(n log₂n)"],
    correct: 2,
  },
  {
    question:
      "Jeżeli zbiór Open jest zaimplementowany jako kolejka priorytetowa (na kopcu binarnym) i zawiera n elementów, wówczas włożenie nowego elementu wymaga czasu:",
    options: ["O(n)", "O(1)", "O(log₂n)", "O(n log₂n)"],
    correct: 2,
  },
  {
    question: "W algorytmie A* o zbiorze Closed można powiedzieć, że:",
    options: [
      "nie może być większego rozmiaru niż zbiór Open",
      "stanowi wystarczający warunek stopu algorytmu",
      "pozwala sprawdzić, czy pewien stan był już odwiedzony",
      "można go zignorować, jeżeli graf zawiera cykl",
    ],
    correct: 2,
  },
  {
    question:
      "Prawdziwe jest następujące zdanie na temat kosztów operacji (put, get) na zbiorze Closed implementowanym jako mapa haszująca:",
    options: [
      "koszty zamortyzowane są O(log₂n)",
      "koszty w najgorszym wypadku są O(log₂n)",
      "koszty zamortyzowane są O(1)",
      "koszty w najgorszym wypadku są O(1)",
    ],
    correct: 2,
  },
  {
    question:
      "W ramach zadanej głębokości algorytm MIN-MAX może być postrzegany jako:",
    options: [
      "algorytm zachłanny",
      "algorytm sortujący",
      "algorytm wyczerpujący",
      "żadne z powyższych",
    ],
    correct: 2,
  },
  {
    question:
      "Algorytm 'przycinanie α−β' wywoła rekurencję (w dół) na rzecz pewnego stanu, jeżeli:",
    options: ["α > β", "α ≥ β", "α < β", "α ≤ β"],
    correct: 2,
  },
  {
    question:
      "Prawdziwe jest następujące zdanie o algorytmie 'przycinanie α−β':",
    options: [
      "gwarantuje odwiedzenie mniejszej liczby stanów niż MIN-MAX",
      "aproksymuje odpowiedź algorytmu MIN-MAX",
      "gwarantuje zasugerowanie takich samych najlepszych ruchów jak MIN-MAX",
      "żadne z powyższych",
    ],
    correct: 2,
  },
  {
    question:
      "Jeżeli D to maksymalna głębokość, a b współczynnik rozgałęzienia, to złożoność 'przycinania α−β' pruning jest proporcjonalna do:",
    options: [
      "bD w przypadku pesymistycznym",
      "√(bD) w przypadku pesymistycznym",
      "bD w przypadku pesymistycznym",
      "√(bD) w przypadku optymistycznym",
    ],
    correct: 0,
  },
  {
    question:
      "Perceptron prosty (inaczej perceptron Rosenblatta) próbuje rozwiązać zadanie:",
    options: [
      "klasyfikacji binarnej",
      "optymalizacji dyskretnej",
      "optymalizacji ciągłej",
      "optymalizacji mieszanej",
    ],
    correct: 0,
  },
  {
    question:
      "Załóżmy, że w perceptronie prostym wektor wag w = {2, 3, -1, -1} ma zostać skorygowany na przykładzie x = {1, 0, 2, -1}, y=-1, przy v=0.5. Prawdziwe jest zdanie:",
    options: [
      "nowy wektor to ω = (2.5, 3, 0, -1.5)",
      "nowy wektor to ω = (1.5, 3, -2, -0.5)",
      "poprawka jest niepotrzebna, bo przykład jest dobrze sklasyfikowany",
      "podane w pytaniu informacje są niewystarczające do określenia nowego wektora",
    ],
    correct: 1,
  },
  {
    question:
      "Twierdzenie Novikoffa implikuje, że algorytm uczący (perceptron prosty) zatrzyma się po skończonej liczbie kroków:",
    options: [
      "zawsze",
      "jeżeli zbiór danych jest liniowo-separowalny",
      "jeżeli zbiór danych nie jest liniowo-separowalny",
      "gdy dane podniesiemy do wyższej wymiarowości",
    ],
    correct: 1,
  },
  {
    question:
      "Górne ograniczenie na liczbę kroków podane przez Novikoffa jest:",
    options: [
      "proporcjonalne do kwadratu promienia danych k ≤ R² / y'²",
      "proporcjonalne do promienia danych",
      "odwrotnie proporcjonalne do kwadratu promienia danych",
      "odwrotnie proporcjonalne do promienia danych",
    ],
    correct: 0,
  },
  {
    question:
      "Niech ω* oznacza nieznany wektor separujący. Jeżeli dane są liniowo separowalne, wtedy podczas algorytmu wyrażenie ω(k), ω*: ",
    options: [
      "nie maleje",
      "nie rośnie",
      "pozostaje stałe",
      "zależy od wielkości ||ω(k)||",
    ],
    correct: 0,
  },
  {
    question: "W perceptronie wielowarstwowym (MLP) sigmoidalna funkcja aktywacji ϕ(s) ma postać:",
    options: [
      "1 / (1 - exp(s))",
      "1 / (1 - exp(-s))",
      "1 / (1 + exp(s))",
      "1 / (1 + exp(-s))"
    ],
    correct: 3
  },
  {
    question: "Prawdziwy jest następujący związek pomiędzy ϕ(s) i jej pochodną:",
    options: [
      "ϕ(s) = ϕ’(s)(1 - ϕ’(s))",
      "ϕ(s) = ϕ’(s)(1 + ϕ(s))",
      "ϕ’(s) = ϕ(s)(1 + ϕ(s))",
      "ϕ’(s) = ϕ(s)(1 - ϕ(s))"
    ],
    correct: 3
  },
  {
    question: "Która z poniższych selekcji najdłużej utrzymuje różnorodność populacji (statystycznie)?:",
    options: [
      "ruletkowa",
      "rankingowa",
      "deterministyczna",
      "nie można rozstrzygnąć"
    ],
    correct: 1
  },
  {
    question: "Algorytm Depth-first search nie może odwiedzić stanu o głębokości d, gdy Open zawiera stany o głębokości:",
    options: [
      "d-1",
      "d+1",
      "d",
      "żadne z powyższych"
    ],
    correct: 1
  },
  {
    question: "Prawdziwe jest następujące zdanie na temat związku pomiędzy algorytmami A* i Dijkstry dla ustalonego problemu:",
    options: [
      "A* wykona nie więcej iteracji niż algorytm Dijkstry",
      "A* wykona nie mniej iteracji niż algorytm Dijkstry",
      "A* wykona tyle samo iteracji co algorytm Dijkstry",
      "nie wiadomo"
    ],
    correct: 0
  },
  {
    question: "W algorytmie Best-first search porządek odwiedzania stanów jest określony wg:",
    options: [
      "kosztu przebytego dotychczas",
      "szacowanego kosztu pozostałego do celu",
      "głębokości",
      "żadne z powyższych"
    ],
    correct: 1
  },
  {
    question: "Jako konwencję dla funkcji heurystycznych h, przyjmuje się że:",
    options: [
      "h(s) < 0 dla wszystkich s",
      "h(s) ≤ 0 dla wszystkich s",
      "h(s) > 0 dla wszystkich s",
      "h(s) ≥ 0 dla wszystkich s"
    ],
    correct: 3
  },
  {
    question: "Jeżeli szukamy najkrótszej ścieżki w grafie geograficznym za pomocą A*, to odległość:",
    options: [
      "euklidesowa może być niedopuszczalną heurystyką",
      "euklidesowa jest zawsze dopuszczalną heurystyką",
      "Manhattan jest zawsze dopuszczalną heurystyką",
      "Manhattan nie doszacowuje odległości euklidesową"
    ],
    correct: 0
  },
  {
    question: "Jeżeli stan t jest pewnym potomkiem stanu s, to warunek monotoniczności heurystyki można zapisać jako:",
    options: [
      "s,t h(t) ≥ h(s) - g(t) - g(s)",
      "s,t h(t) ≥ h(s) - g(t) + g(s)",
      "s,t h(s) ≥ h(t) - g(t) - g(s)",
      "s,t h(s) ≥ h(t) - g(t) + g(s)"
    ],
    correct: 1
  },
  {
    question: "Warunek monotoniczności heurystyki można także wypowiedzieć jako:",
    options: [
      "s, t h(t) ≤ g(s) − g(t) + h(s)",
      "s, t f(s) ≤ g(t) − g(s) + h(s)",
      "s, t h(s) ≤ g(t) − g(s) + h(s)",
      "s, t h(s) ≤ g(t) − g(s) + h(t)"
    ],
    correct: 3
  },
  {
    question: "Jeżeli zbiór Open jest kolejką priorytetową (na kopcu binarnym) i zawiera n elementów, to pobranie (i usunięcie) elementu minimalnego wymaga czasu:",
    options: [
      "O(n)",
      "O(1)",
      "O(log₂n)",
      "O(n log₂n)"
    ],
    correct: 2
  },
  {
    question: "Prawdziwe jest następujące zdanie na temat zbioru Closed w algorytmie A*:",
    options: [
      "może być pominięty, jeżeli graf nie ma cykli",
      "nie może przewyższać rozmiarem zbioru Open",
      "stanowi wystarczający warunek stopu algorytmu",
      "nie pozwala sprawdzać, czy stan był już odwiedzony"
    ],
    correct: 0
  },
  {
    question: "Prawdziwe jest następujące zdanie na temat kosztów operacji (put, get) w zbiorze Closed będącym mapą haszującą:",
    options: [
      "zamortyzowane koszty są O(1)",
      "koszty w najgorszym przypadku są O(1)",
      "zamortyzowane koszty są O(log₂n)",
      "koszty w najgorszym przypadku są O(log₂n)"
    ],
    correct: 0
  },
  {
    question: "W układance puzzle przesuwne niech hMT, hM, hM+LC oznaczają odpowiednio heurystyki: Misplaced Tiles, Manhattan oraz Manhattan + Linear Conflicts. Prawdziwe jest zdanie:",
    options: [
      "hMT zaniedbuje odległości płytek od ich miejsc docelowych",
      "hM nie jest monotoniczna",
      "hMT+LC(s) dodaje 1 za każdy konflikt liniowy",
      "hMT(s) ≥ hM(s) dla wszystkich stanów s"
    ],
    correct: 0
  },
  {
    question: "W przeszukiwaniu drzewa gry, gdy b jest współczynnikiem rozgałęziania i rozważa się przynajmniej 2 półruchy, to złożoność w najgorszym przypadku skaluje się:",
    options: [
      "liniowo z b",
      "wykładniczo z b",
      "wielomianowo z b",
      "logarytmicznie z b"
    ],
    correct: 1
  },
  {
    question: "Dla głębokości maksymalnej D i współczynnika rozgałęziania b złożoność algorytmu MIN-MAX jest:",
    options: [
      "O(dB)",
      "O(D+b)",
      "O(Db)",
      "O(b^D)"
    ],
    correct: 3
  },
  {
    question: "'Przycinanie α−β' odwiedza potomka aktualnego stanu, kiedy:",
    options: [
      "α > β",
      "α ≥ β",
      "α < β",
      "α ≤ β"
    ],
    correct: 2
  },
  {
    question: "Prawdziwe jest następujące zdanie dla przycinania α−β (b współczynnik rozgałęziania, D maksymalna głębokość):",
    options: [
      "ma taką samą pesymistyczną złożoność jak MIN-MAX",
      "ma taką samą optymistyczną złożoność jak MIN-MAX",
      "ma wykładniczą złożoność ze względu na b",
      "ma wielomianową złożoność ze względu na D"
    ],
    correct: 0
  },
  {
    question: "Perceptron prosty (lub perceptron Rosenblatta) poszukuje:",
    options: [
      "wielomianowej granicy decyzyjnej",
      "liniowej granicy decyzyjnej",
      "maksimum iloczynu skalarnego",
      "minimum iloczynu skalarnego"
    ],
    correct: 1
  },
  {
    question: "Perceptron prosty poprawia wagi wg wzoru:",
    options: [
      "ω(k+1) := ηxᵢyᵢ",
      "ω(k+1) := −ηxᵢyᵢ",
      "ω(k+1) := ω(k) − ηxᵢyᵢ",
      "ω(k+1) := ω(k) + ηxᵢyᵢ"
    ],
    correct: 3
  },
  {
    question: "W perceptronie prostym wektor wag ω=(0, 3, −1, −1) jest testowany dla przykładu x=(1, 0, 2, −1), y=1. Można powiedzieć, że:",
    options: [
      "przykład jest poprawnie sklasyfikowany",
      "przykład jest błędnie sklasyfikowany",
      "nie można wykonać testu, ponieważ ω₀=0",
      "żadne z powyższych"
    ],
    correct: 1
  },
  {
    question: "Zgodnie z dowodem twierdzenia Novikoffa, warunki ściskające na iloczyn skalarny ω(k), ω* mają postać:",
    options: [
      "kγ'min ≥ ω(k), ω* ≥ √kRmax",
      "kγ'²min ≥ ω(k), ω* ≥ √kR²max",
      "kγ'min ≤ ω(k), ω* ≥ √kRmax",
      "kγ'²min ≤ ω(k), ω* ≥ √kR²max"
    ],
    correct: 2
  },
  {
    question: "Jeżeli algorytm uczący perceptron Rosenblatta wpada w nieskończoną pętlę, to oznacza, że:",
    options: [
      "dane nie są liniowo separowalne",
      "dane są liniowo separowalne",
      "twierdzenie Novikoffa nie obejmuje tego przypadku",
      "żadne z powyższych"
    ],
    correct: 0
  },
  {
    question: "Przypuśćmy, że zaprojektowano wariant perceptronu prostego bez wyrazu wolnego, tj. ω₀=0 (zawsze). Wtedy:",
    options: [
      "algorytm jest niestabilny",
      "algorytm nie zatrzyma się",
      "algorytm i tak się zatrzyma",
      "niektóre zbiory danych nie pozwolą się sklasyfikować"
    ],
    correct: 3
  },
  {
    question: "W perceptronie wielowarstwowym (MLP) sigmoidalna funkcja aktywacji ϕ(s) jest:",
    options: [
      "monotoniczna",
      "niemonotoniczna",
      "parzysta",
      "jednomodalna"
    ],
    correct: 0
  },
  {
    question: "Pochodną funkcji ϕ(s) można zapisać jako:",
    options: [
      "ϕ′(s) = exp(-s) / (1 + exp(-s))",
      "ϕ′(s) = -exp(-s) / (1 + exp(-s))",
      "ϕ′(s) = exp(-s) / (1 + exp(-s))²",
      "ϕ′(s) = -exp(-s) / (1 + exp(-s))²"
    ],
    correct: 2
  },
  {
    question: "Niech x* oznacza osobnika z najlepszym przystosowaniem w aktualnej populacji. Wtedy:",
    options: [
      "tylko selekcja rankingowa gwarantuje jego sukcesję",
      "tylko selekcja ruletkowa gwarantuje jego sukcesję",
      "obie selekcje ruletkowa i rankingowa gwarantują jego sukcesję",
      "żadne z powyższych"
    ],
    correct: 3
  },
  {
    question: "Programowanie dynamiczne dla dyskretnego problemu plecakowego (DKP) o n elementach wymaga wykładniczego czasu, gdy objętość plecaka C jest proporcjonalna do:",
    options: [
      "n",
      "2ⁿ",
      "n²",
      "1"
    ],
    correct: 1
  },
  {
    question: "Kluczowe przejście indukcyjne w programowaniu dynamicznym dla dyskretnego problemu plecakowego ma postać:",
    options: [
      "aᵢⱼ = max{aᵢⱼ₋₁, aᵢ₋cⱼ,ⱼ₋₁ + vⱼ}",
      "aᵢⱼ = max{aᵢⱼ₋₁, aᵢⱼ₋₁ − Cⱼ + vⱼ}",
      "aᵢⱼ = max{aᵢⱼ₋₁, aᵢ₋₁,ⱼ₋₁ + vⱼ}",
      "aᵢⱼ = max{aᵢⱼ₋₁, aᵢ₋₁,ⱼ₋₁ − Cⱼ + vⱼ}"
    ],
    correct: 0
  },
  {
    question: "W układance puzzle przesuwne niech hMT, hM, hM+LC oznaczają odpowiednio heurystyki: Misplaced Tiles, Manhattan oraz Manhattan + Linear Conflicts. Prawdziwe jest zdanie:",
    options: [
      "hMT jest dopuszczalna, a hM nie jest",
      "hM jest dopuszczalna, a hMT nie jest",
      "hMT(s) ≥ hM(s) dla wszystkich stanów s",
      "hM+LC(s) ≥ hM(s) dla wszystkich stanów s"
    ],
    correct: 3
  },
  {
  question: "W pewnym algorytmie genetycznym (maksymalizującym) mamy 4 osobników o przystosowaniach f1 =5, f2=0, f3=10, f4=1. Prawdopodobieństwo sukcesu tych osobników wyniosą: W selekcji rankingowej: 3/10, 1/10, 4/10, 2/10 W selekcji ruletkowej: 5/16, 0, 10/16, 1/16",
  options: [
    "Prawda",
    "Fałsz"
  ],
  correct: 0
},
{
    question: "W pewnym algorytmie genetycznym (maksymalizującym) mamy 4 osobników o przystosowaniach f1 =5, f2=0, f3=10, f4=1. Prawdopodobieństwo sukcesu tych osobników wyniosą: W selekcji rankingowej: 3/10, 1/10, 4/10, 2/10 W selekcji ruletkowej: 5/16, 0, 10/16, 1/16",
    options: ["Prawda", "Fałsz"],
    correct: 0
  },
  {
    question: "Algorytmy genetyczne służą do rozwiązywania zadań:",
    options: ["aproksymacji", "optymalizacji", "klasyfikacji binarnej", "klasyfikacji"],
    correct: 1
  },
  {
    question: "Algorytmy genetyczne nie wymagają:",
    options: [
      "generowania liczb losowych",
      "informacji o wartości funkcji optymalizowanej w punkcie",
      "informacji o pochodnej funkcji optymalizowanej w punkcie",
      "selekcji rozwiązań – kandydatów"
    ],
    correct: 2
  },
  {
    question: "Uczenie sieci neuronowej w trybie on-line oznacza, że: Poprawki następują od razu po obejrzeniu pojedynczego przykładu",
    options: ["Prawda", "Fałsz"],
    correct: 0
  },
  {
    question: "W pewnym algorytmie genetycznym mamy czterech osobników o przystosowaniach f(x1 ) = 2, f(x2 ) = 1, f(x3 ) = 4, f(x4 ) = 9 . Odpowiadające im prawdopodobieństwa sukcesji w selekcji ruletkowej to:",
    options: ["2/9, 1/9, 4/9, 9/9", "2/16, 1/16, 4/16, 9/16", "0,0,0,1", "2/10, 1/10, 3/10, 4/10"],
    correct: 1
  },
  {
    question: "W ramach poprzedniego zadania oczekiwana liczba kopii osobnika x1 po selekcji wynosi?",
    options: ["1", "2", "12", "½"],
    correct: 3
  },
  {
    question: "W pewnym algorytmie genetycznym mamy 4 osobników o następujących przystosowaniach f(x1 ) = 2, f(x2 ) = 1, f(x3 ) = 4, f(x4 ) = 3. Odpowiadające im prawdopodobieństwa sukcesji dla selekcji rankingowej wynoszą:",
    options: ["2/16, 1/16, 4/16, 3/16", "2/4, 1/4, 4/4, 3/4", "0, 0, 0, 1", "2/10, 1/10, 4/10, 3/10"],
    correct: 3
  },
  {
    question: "Dla warunków z poprzedniego zadania, oczekiwana liczba kopii x1 po selekcji wynosi:",
    options: ["4/10", "1/4", "4/5 - suma oczekiwanych liczb kopii dla wszystkich osobników powinna być równa liczbie osobników", "4* 2/10"],
    correct: 2
  },
  {
    question: "O sigmoidalnej funkcji aktywacji można powiedzieć, że: jest wszędzie różniczkowalna, jest ściśle rosnąca",
    options: ["Prawda", "Fałsz"],
    correct: 0
  },
  {
    question: "W pewnym AG ma zostać skrzyżowana następująca para rodziców (0,0,1,0,1,1,0,1) i (1,1,1,1,1,0,0,1). Wylosowano punkt krzyżowania jako punkt pomiędzy trzecim i czwartym bitem. W rezultacie otrzymamy:",
    options: [
      "jednego potomka (0,0,1,1,1,0,0,1)",
      "jednego potomka (1,1,1,0,1,1,0,1)",
      "dwóch potomków (0,0,1,1,1,0,0,1) i (1,1,1,0,1,1,0,1)",
      "ci rodzice nie mogą zostać skrzyżowani"
    ],
    correct: 2
  },
  {
    question: "W perceptronie prostym do poprawki wag w danym kroku mogą być wybrane jedynie przykłady źle sklasyfikowane",
    options: ["Prawda", "Fałsz"],
    correct: 0
  },
  {
    question: "W perceptronie prostym wektor wag w = (1, 2, 3, 4) ma być poprawiony na podstawie pary uczącej x = (1, 0, 1, -1), y = 1 przy współczynniku uczenia eta = 1.0. Prawdziwe jest następujące stwierdzenie: powstanie wektor wynikowy w = (2, 2, 4, 3)",
    options: ["Prawda", "Fałsz"],
    correct: 0
  },
  {
    question: "Jeżeli zbiór danych nie jest liniowo-separowalny, to algorytm uczenia perceptronu prostego nie zatrzyma się",
    options: ["Prawda", "Fałsz"],
    correct: 0
  },
  {
    question: "Uczenie sieci neuronowej w trybie off-line oznacza, że poprawki następują dopiero po obejrzeniu wszystkich przykładów",
    options: ["Prawda", "Fałsz"],
    correct: 0
  },
  {
    question: "W selekcji turniejowej z turniejem o rozmiarze równym rozmiarowi populacji, nowa populacja:",
    options: ["napełnia się najlepszym osobnikiem", "losuje najlepszych", "zawsze wybiera nowych osobników", "tworzy nowe osobniki"],
    correct: 0
  },
  {
    question: "Algorytmy genetyczne (AG) próbują poszukiwać:",
    options: ["miejsc zerowych", "optymów lokalnych", "rozwiązań stabilnych", "żadne z powyższych"],
    correct: 3
  },
  {
    question: "Przykładowym zastosowaniem perceptronu prostego może być:",
    options: ["Kompresja stratna zdjęć", "Wyznaczanie najkrótszej ścieżki", "Kreślenie linii w grafice 2D", "Filtr antyspamowy"],
    correct: 3
  },
  {
    question: "W „przycinaniu alfa-beta” analizowany jest pewien stan typu MAX, dla którego procedurę wywołano z początkowymi wartościami alfa=10, beta=11. Przypuśćmy, że wartości zwracane dla tego stanu ze stanów potomnych będą wynosiły kolejno: 5,10,11,12,13. Można powiedzieć, że:",
    options: [
      "Sytuacja ta jest niemożliwa ze względu na wartość pierwszego potomka 5 < alfa",
      "Przycięcie nastąpi po pierwszym potomku",
      "Po drugim potomku",
      "Po trzecim potomku"
    ],
    correct: 3
  },
  {
    question: "Algorytm „przycinanie alfa-beta” uruchomiono dla gry „kółko i krzyżyk”, generując stany potomne aż do maksymalnej możliwej głębokości i oceniając terminale jedną z trzech możliwych wartości: -inf, 0, inf. Można powiedzieć, że:",
    options: [
      "Algorytm wykryje optymalną sekwencję ruchów, ale przycięcia nie wystąpią",
      "Algorytm wykryje optymalną sekwencję ruchów i przycięcia wystąpią",
      "Algorytm nie wykryje optymalnej sekwencji ruchów i przycięcia nie wystąpią",
      "Algorytm nie wykryje optymalnej sekwencji ruchów, ale przycięcia wystąpią"
    ],
    correct: 1
  },
  {
    question: "Suma ważona obliczana w perceptronie prostym to inaczej:",
    options: [
      "Iloczyn skalarny wektora danych i wektora wag",
      "Iloczyn wektorowy wektora danych i wektora wag",
      "Norma wektora danych",
      "Norma wektora wag"
    ],
    correct: 0
  },
  {
    question: "Funkcję aktywacji w perceptronie prostym można określić jako funkcję:",
    options: ["Sigmoidalną", "Ciągłą", "Stałą", "Schodkową"],
    correct: 3
  },
  {
    question: "Algorytm uczenia dla perceptronu prostego można scharakteryzować jako algorytm:",
    options: ["On-line", "Zachłanny", "Rekurencyjny", "Dziel i zwyciężaj"],
    correct: 0
  },
  {
    question: "Jeżeli zbiór danych jest liniowo-separowalny, to algorytm uczenia perceptronu prostego:",
    options: [
      "Nie zatrzyma się",
      "Odwiedzi wszystkie przykłady uczące",
      "Odwiedzi tylko podzbiór przykładów uczących",
      "Odpowiednio wyznaczy klasy"
    ],
    correct: 3
  },
  {
    question: "Jeżeli sieć neuronowa MLP rozwiązuje zadanie estymacji regresji, to o wartościach yi dla przykładów uczących można powiedzieć, że:",
    options: ["Są ze zbioru {-1,1}", "Są naturalne", "Są rzeczywiste", "Są nieznane"],
    correct: 2
  },
  {
    question: "Jeżeli sprawdzenie, czy stan był odwiedzony, ma złożoność O(1), to jest to operacja realizowana:",
    options: ["W miejscu", "W czasie stałym", "W czasie liniowym", "W 1 przebiegu pętli"],
    correct: 1
  },
  {
    question: "Zbiór Closed realizowany przez mapę haszującą można zastąpić zwykłą tablicą, jeżeli:",
    options: [
      "Graf nie ma cykli",
      "Graf ma co najwyżej 1 cykl",
      "Liczba węzłów jest znana",
      "Liczba krawędzi jest znana"
    ],
    correct: 2
  },
  {
    question: "Puzzle przesuwane można zaliczyć do grafowych problemów poszukiwania:",
    options: [
      "Najkrótszej ścieżki",
      "Ścieżki Hamiltona",
      "Ścieżki Eulera",
      "Porządku topologicznego"
    ],
    correct: 0
  },
  {
    question: "W problemie jeepa rozwiązanie dla n=2 wynosi:",
    options: [
      "1+ ½",
      "1 + 1/3",
      "1 + 1/3 + 1/3",
      "1 + sqrt(2)/2"
    ],
    correct: 1
  },
  {
    question: "Problem komiwojażera to inaczej problem znalezienia:",
    options: [
      "Najkrótszego cyklu Hamiltona",
      "Najkrótszego cyklu Eulera",
      "Najkrótszej ścieżki Hamiltona",
      "Najkrótszej ścieżki Eulera"
    ],
    correct: 0
  },
  {
    question: "„Iterowany dylemat więźnia” redukuje się indukcyjnie do pojedynczego dylematu więźnia, jeżeli:",
    options: [
      "Gracze cały czas współpracują",
      "Gracze cały czas zdradzają",
      "Gracze grają wet za wet",
      "Liczba rund jest znana z góry"
    ],
    correct: 3
  },
  {
    question: "W „grze w życie” Conwaya pusta komórka przeradza się w pełną, jeżeli ma:",
    options: [
      "Dokładnie 2 sąsiadów",
      "Dokładnie 3 sąsiadów",
      "Dokładnie 2 lub 3 sąsiadów",
      "Żadne z powyższych"
    ],
    correct: 1
  },
  {
    question: "Zdaniem Turinga problem „czy maszyny mogą myśleć?” można rozstrzygnąć tylko przez napisanie programu:",
    options: [
      "Grającego w naśladownictwo",
      "Grającego w szachy",
      "Komponującego utwory muzyczne",
      "Żadne z powyższych"
    ],
    correct: 0
  },
  {
    question: "Filtr antyspamowy jest przykładem zadania:",
    options: [
      "Rozpoznawania wzorców",
      "Klasteryzacji binarnej",
      "Przeszukiwania grafu",
      "Indukcji reguł decyzyjnych"
    ],
    correct: 0
  },
  {
    question: "Jako konwencję przyjmuje się, że funkcje heurystyczne w algorytmach grafowych są:",
    options: [
      "Dodatnie",
      "Nieujemne",
      "Ściśle monotoniczne",
      "Różnowartościowe"
    ],
    correct: 1
  },
  {
    question: "W pewnym binarnym naiwnym klasyfikatorze Bayesa użyto dla bezpieczeństwa numerycznego techniki logarytmowania. Przypuśćmy, że na wejście tego klasyfikatora podstawiono obiekt testowy o cechach (a, b, c)m oraz wiadomo, że\n\nP(X₁ = a | Y = +) = 0.25,  P(X₂ = b | Y = +) = 0.125,  P(X₃ = c | Y = +) = 0.5,  P(Y = +) = 0.5\n\nUżywając logarytmu o podstawie 2, oblicz odpowiedź tego klasyfikatora na rzecz klasy Y = +.\n\nWynosi ona:",
    options: [
        "(1/2)^6",
        "-6",
        "(1/2)^7",
        "-7"
    ],
    correct: 3
  },
  {
    "question": "Dla układanki puzzle przesuwne postaci (cyfry pisane kolejno wierszami):\n(7, 0, 8; 6, 5, 4; 3, 1, 2)\nwartość heurystyki 'Manhattan + Linear Conflicts' wynosi",
    "options": [
        "24",
        "37",
        "19",
        "11"
    ],
    correct: 2
},
{
  question: "Dana jest pewna struktura sieci Bayesa. Węzeł A nie ma rodziców i połączony jest z węzłem B, a B wpływa na C. Zakładając, że wszystkie zmienne są binarne, to dla prawidłowego wnioskowania należy podać zestaw następujących prawdopodobieństw:",
  options: [
      "P(A), P(B), P(C)",
      "P(C|A), P(B|A), P(C|B)",
      "P(A), P(B|A), P(B|egA), P(C|B), P(C|egB)",
      "P(C), P(B|C), P(B|egC), P(A|B), P(A|egB)"
  ],
  correct: 2
},
{
  question: "W algorytmie RPROP (przy domyślnych nastawach początkowych)\n\nη₀ = 0.1, α = 1.2, β = 0.5\n\naktualny współczynnik uczenia pewnej konkretnej wagi po czterech aktualizacjach wynosi\n\n0.72η₀\n\nOznacza to, że pochodne funkcji błędu ze względu na tę wagę",
  options: [
      "nie zmieniały znaku",
      "jednokrotnie zmieniały znak",
      "dwukrotnie zmieniały znak",
      "trzykrotnie zmieniały znak"
  ],
  correct: 1
},
{
  question: "Schemat wnioskowania sylogizm warunkowy wyraża regułę",
  options: [
      "Jeżeli prawdziwe jest P i (P ⇒ Q i Q → R), to wnioskujemy prawdziwość R",
      "Jeżeli prawdziwe jest P i (P ⇒ Q i ¬P), to wnioskujemy prawdziwość Q",
      "Jeżeli prawdziwe jest P i (P ⇒ Q i ¬Q), to wnioskujemy prawdziwość P",
      "Jeżeli prawdziwe jest P i (P ⇒ Q i Q), to wnioskujemy prawdziwość Q"
  ],
  "correct": 0
},
{
  question: "Dla układanki puzzle przesuwane postaci (cyfry pisane kolejno wierszami):\n(7, 0, 8; 6, 5, 4; 3, 1, 2)\nwartość heurystyki 'Manhattan' wynosi",
  options: [
      "12",
      "13",
      "11",
      "14"
  ],
  correct: 1
},
{
  question: "Wskaż grupę algorytmów reprezentujących nieinformowane techniki przeszukiwania grafów",
  options: [
      "Best-rst search, A*, IDA*",
      "Breadth-rst search, Depth-rst search, algorytm Dijkstry",
      "algorytm Dijkstry, Best-rst search, A*",
      "Breadth-rst search, Depth-rst search, Best-rst search"
  ],
  correct: 1
},
{
  question: "W grze w 'iterowany dylemat więźnia'",
  options: [
      "liczba rund nie powinna być znana graczom z góry",
      "racjonalnym wyborem w każdej rundzie jest: zdradzić",
      "racjonalnym wyborem w każdej rundzie jest: milczeć",
      "najlepszą strategią jest 'wet za wet'"
  ],
  correct: 0
},
{
  question: "Powiedzmy, że pewna sztuczna inteligencja do gry w szachy pracuje z użyciem nastaw: „przycinanie alpha-beta” + głębokość 3.5 + quiescence + tablica transpozycji. Wskaż zmianę, która statystycznie spowoduje największe pogorszenie jakości gry tej sztucznej inteligencji:",
  options: [
    "Wyłączenie tablicy transpozycji",
    "Obniżenie głębokości do 3.0",
    "Przełączenie algorytmu na „MIN-MAX”",
    "Wyłączenie quiescence"
  ],
  correct: 1
},
{
  question: "W 'przycinaniu alfa-beta' analizowany jest pewien stan typu MAX, dla którego procedurę wywołano z początkowymi wartościami\n\nα = 10, β = 15\n\nPrzypuśćmy, że wartości zwracane do tego stanu ze stanów potomnych wynosiłyby kolejno:\n\n13, -∞, 17, 4, ∞\n\nPrzycięcie nastąpi po:",
  options: [
      "pierwszym potomku",
      "trzecim potomku",
      "czwartym potomku",
      "drugim potomku"
  ],
  correct: 1
},
{
  question: "W logice predykatów pierwszego rzędu podane jest zdanie:\n\n∀x smok(x) ∨ wilkołak(x) ⇒ postaćMagiczna(x)\n\nJaki jest poprawny w Prologu wyrażający tę zależność?",
  options: [
      "smok(x) :- postaćMagiczna(x), wilkołak(x) :- postaćMagiczna(x).",
      "postaćMagiczna(x) :- smok(x); wilkołak(x).",
      "postaćMagiczna(x) :- smok(x), wilkołak(x).",
      "smok(x); wilkołak(x) :- postaćMagiczna(x)."
  ],
  correct: 1
},
{
  question: "Co to jest baza wiedzy?",
  options: [
      "Zbiór zdań w języku formalnym np. w języku opartym na paradygmatach logiki zależny od opisywanej dziedziny/obszaru",
      "Element systemu, który zarządza danymi najczęściej w architekturze klient-serwer",
      "Zbiór danych zapisanych zgodnie z określonymi regułami, np. w postaci tabeli wypełnionej wartościami",
      "Element systemu, który stosuje zasady logiczne by wydedukować nowe informacje"
  ],
  correct: 0
},
{
  question: "Algorytmy genetyczne są przeznaczone",
  options: [
      "rozwiązywania problemów optymalizacji w sposób przybliżony",
      "rozwiązywania problemów klasykacji w sposób przybliżony",
      "rozwiązywania problemów klasykacji w sposób dokładny",
      "rozwiązywania problemów optymalizacji w sposób dokładny"
  ],
  correct: 0
},
{
  question: "Jeżeli algorytm A* używa jako heurystyki dolnego ograniczenia na odległość do celu, to",
  options: [
      "nie gwarantuje on znalezienia najkrótszej ścieżki",
      "gwarantuje on znalezienie najkrótszej ścieżki",
      "nie wymaga on zbioru Closed",
      "jest on wolniejszy niż algorytm Dijkstry"
  ],
  correct: 1
},
{
  question: "Dana jest reguła:\n\nIF zdarzenie A [LS=2.0, LN=0.3] THEN zdarzenie B P(jp)=0.5.\n\nJeżeli podano dowód, zdarzenie A zaistniało, to",
  options: [
      "poprzez swoją wartość współczynnik LS zmniejszy przekonanie o prawdopodobieństwie zdarzenia B",
      "poprzez swoją wartość współczynnik LN zwiększy przekonanie o prawdopodobieństwie zdarzenia B",
      "prawdopodobieństwo zdarzenia B nie zmieni się.",
      "poprzez swoją wartość współczynnik LS zwiększy przekonanie o prawdopodobieństwie zdarzenia B"
  ],
  "correct": 3
},
{
  question: "W sieci bayesowskiej węzły reprezentują",
  options: [
      "wpływ potomków na rodziców",
      "zmienne losowe",
      "tylko prawdopodobieństwo a priori zdarzeń",
      "wpływ jednego zdarzenia na inne"
  ],
  correct: 1
},
{
  question: "W sieci przekonań/Bayesa krawędzie reprezentują",
  options: [
      "ciągłe zmienne losowe",
      "zmienne losowe (w tym dyskretne i ciągłe)",
      "wpływ jednego zdarzenia (zmiennej) na inne zdarzenie",
      "tylko prawdopodobieństwo a priori faktów"
  ],
  "correct": 2
},
{
  question: "Założenie naiwne w klasyfikatorze bayesowskim mówi dokładnie, że",
  options: [
      "zmienne wejściowe są parami zależne (bezwarunkowo)",
      "zmienne wejściowe są parami niezależne (bezwarunkowo)",
      "zmienne wejściowe są parami niezależne warunkowo w klasach decyzyjnych",
      "zmienne wejściowe są parami zależne warunkowo w klasach decyzyjnych"
  ],
  correct: 2
},
{
  question: "Niech\n\n- t oznacza numer kroku uczenia sieci neuronowej,\n- e pewną przyjętą funkcję błędu (w szczególności może ona oznaczać błąd kwadratowy),\n- η, μ odpowiednio współczynniki uczenia i rozpędu.\n\nW metodzie uczenia z rozpędem wzór na poprawkę dowolnej wagi sieci, oznaczonej jako v ma postać",
  options: [
      "v(t + 1) = v(t) - η (∂e / ∂v(t)) + μ(v(t) - v(t - 1))",
      "v(t + 1) - v(t) = - η (∂e / ∂v(t)) - μv(t)",
      "v(t + 1) = v(t) - η (∂e / ∂v(t)) - μ(v(t) - v(t - q))",
      "v(t + 1) = v(t) - η (∂e / ∂v(t)) + μv(t)"
  ],
  correct: 0
},
{
  question: "Realizacja zbioru Open (w algorytmach A* i Best-rst search) za pomocą kopca binarnego powoduje, że pobranie elementu minimalnego oraz włożenie nowego elementu są o złożonościach odpowiednio",
  options: [
      "O(logn) i O(logn)",
      "O(1) i O(1)",
      "O(1) i O(logn)",
      "O(logn) i O(1)"
  ],
  correct: 0
},
{
  question: "Dla pewnego wektora cech x klasyfikator bayesowski zwraca odpowiedź y*, której probabilistyczny sens jest następujący",
  options: [
      "y* = arg max P(X = x | Y = y)",
      "żadna z pozostałych odpowiedzi nie jest prawdziwa",
      "y* = arg max P(Y = y, X = x)",
      "y* = arg max P(Y = y | X = x)"
  ],
  correct: 3
},
{
  question: "Kod w języku programowania Prolog to zbiór",
  options: [
      "zdań w rachunku zdań",
      "klauzul Horna, czyli takich, które zawierają więcej niż jeden niezanegowany predykat",
      "klauzul Horna, czyli takich, które zawierają co najwyżej jeden niezanegowany predykat",
      "dowolnych zdań w logice predykatów pierwszego rzędu"
  ],
  correct: 2
},
{
  question: "Niech η, μ oznaczają odpowiednio współczynniki uczenia i rozpędu. Jeżeli przez pewien czas w trakcie uczenia sieci neuronowej z rozpędem wielkości kolejnych gradientów pozostają w przybliżeniu stałe, to można powiedzieć, że efektywny współczynnik uczenia jest wówczas proporcjonalny do",
  options: [
      "ημ",
      "η / (1 - μ)",
      "ημ^2",
      "μ / (1 - η)"
  ],
  correct: 1
},
{
  question: "Niech E_{l,k} oznacza wyrażenie błędu (obliczone w ramach metody wstecznej propagacji błędu) dla neuronu k-ego w warstwie l. Wtedy pochodna błędu kwadratowego ze względu na wagę v_{l,k,j} wynosi",
  options: [
      "E_{l,k} φ_{l-1,j} (1 - φ_{l-1,j})",
      "√(E_{l,k} φ_{l-1,j} (1 - φ_{l-1,j}))",
      "√(E_{l,k} φ_{l-1,j})",
      "E_{l,k} φ_{l-1,j}"
  ],
  correct: 3
},
{
  question: "Modus ponendo ponens (Modus ponens) wyraża",
  options: [
      "Jeżeli prawdziwe jest P ⇒ Q i P, to wnioskujemy prawdziwość Q",
      "Jeżeli prawdziwe jest P ⇒ Q i Q ⇒ R, to wnioskujemy prawdziwość R",
      "Jeżeli prawdziwe jest P ⇒ Q i ¬P, to wnioskujemy prawdziwość Q",
      "Jeżeli prawdziwe jest P ⇒ Q i ¬Q, to wnioskujemy prawdziwość P"
  ],
  correct: 0
},
{
  question: "Dla sieci MLP z jedną warstwą ukrytą, pochodne błędu kwadratowego dla wag v_{k,j} można wyrazić wzorem",
  options: [
      "(y_{MLP} - y_i) w_k φ_k (1 - φ_k) x_{i,j}",
      "y_i φ_k (1 - φ_{hi}) x_{i,j}",
      "(y_{MLP} - y_i) φ_k (1 - φ_k) x_{i,j}",
      "y_i w_k φ_k (1 - φ_k) x_{i,j}"
  ],
  correct: 0
},
{
  question: "Pewien algorytm genetyczny odnotował (dla populacji pięciu osobników) następujące przystosowania:\n\nf(x₁) = 5, f(x₂) = 1, f(x₃) = 10, f(x₄) = 2, f(x₅) = 2\n\n i będzie wykonywał selekcję ruletkową. Wskaż prawdziwe zdanie",
  options: [
      "prawdopodobieństwo selekcji piątego osobnika wynosi 2/10",
      "osobnik drugi nie zostanie wyselekcjonowany",
      "oczekiwana liczba egzemplarzy trzeciego osobnika po selekcji wynosi 2.5",
      "oczekiwana liczba egzemplarzy pierwszego osobnika po selekcji wynosi 4/5"
  ],
  correct: 2
},
{
  question: "Dana jest pewna struktura sieci bayesowskiej. Węzeł A i B nie mają rodziców i połączone są z węzłem C: A wpływa na C i B wpływa na C. Które z węzłów są niezależne, jeżeli nie podano żadnych dodatkowych przekonań (dowodów)?",
  options: [
      "a nie ma węzłów niezależnych",
      "A i B",
      "C",
      "A, B, i C"
  ],
  correct: 1
},
{
  question: "W logice predykatów pierwszego rzędu podane jest zdanie:\n\n∀x wiedźmin(x) ⇒ mutant(x)\n\nJaki jest poprawny kod w Prologu wyrażający tę zależność?",
  options: [
      "wiedzmin(x). mutant(x).",
      "wiedzmin(x) :- mutant(x).",
      "mutant(x) :- wiedzmin(x).",
      "wiedzmin(x), mutant(x)."
  ],
  correct: 2
},
{
  question: "Pochodna sigmoidalnej funkcji aktywacji wynosi",
  options: [
      "exp(-s)/(1 + exp(-s))^2",
      "exp(s)/(1 + exp(-s))^2",
      "exp(-s)^2/(1 + exp(-s))",
      "exp(s)^2/(1 + exp(-s))"
  ],
  correct: 0
},
{
  question: "O naiwnym klasyfikatorze Bayesa można powiedzieć, że",
  options: [
      "nie cierpi na przekleństwo wymiarowości i złożoność obliczenia odpowiedzi skaluje się kwadratowo wraz z liczbą zmiennych wejściowych",
      "cierpi na przekleństwo wymiarowości i złożoność obliczenia odpowiedzi skaluje się wykładniczo wraz z liczbą zmiennych wejściowych",
      "cierpi na przekleństwo wymiarowości i złożoność obliczenia odpowiedzi skaluje się liniowo wraz z liczbą zmiennych wejściowych",
      "nie cierpi na przekleństwo wymiarowości i złożoność obliczenia odpowiedzi skaluje się liniowo wraz z liczbą zmiennych wejściowych"
  ],
  correct: 3
},
{
  question: "Bezpieczeństwo numeryczne obliczeń w klasyfikatorze bayesowskim można podnieść poprzez",
  options: [
      "poprawkę LaPlace'a",
      "założenie naiwne",
      "użycie funkcji gęstości",
      "logarytmowanie"
  ],
  correct: 3
},
{
  question: "Elementem gwarantującym znalezienie najkrótszej ścieżki (ścieżki o najmniejszym koszcie) przez algorytm A* jest",
  options: [
      "heurystyka dopuszczalna",
      "użycie mapy mieszającej do implementacji zbioru Closed",
      "generowanie minimalnego zbioru potomków",
      "warunek stopu"
  ],
  correct: 0
},
{
  question: "Zgodnie z dowodem twierdzenia Novikoa, górne ograniczenie na liczbę kroków wykonanych przez algorytm uczenia perceptronu prostego skaluje się odwrotnie proporcjonalnie do",
  options: [
      "promienia danych",
      "kwadratu marginesu między klasami",
      "kwadratu promienia danych",
      "marginesu między klasami"
  ],
  correct: 1
},
{
  question: "W pewnym algorytmie genetycznym mają zostać skrzyżowane następujące dwa osobniki:\n\n(1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1)\n(1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0)\n\nw ramach krzyżowania jednopunktowego. Wskaż parę potomków, która nie jest możliwa do uzyskania niezależnie od wyboru punktu krzyżowania",
  options: [
      "(1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0) , (1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1)",
      "(1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1) , (1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0)",
      "(1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0) , (1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1)",
      "(1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0) , (1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1)"
  ],
  correct: 0
},
{
  question: "Jeżeli zdarzenia dwa zdarzenia A, B są niezależne to",
  options: [
      "P(A|B) = P(A)",
      "P(A ∩ B) > P(A) P(B)",
      "P(A|B) = P(A) P(B)",
      "żadna z pozostałych odpowiedzi nie jest prawdziwa"
  ],
  correct: 0
},
{
  question: "Unifikacja to",
  options: [
      "Procedura wnioskowania z użyciem reguły modus ponens",
      "procedura/algorytm, w wyniku której uzyskuje się usunięcie wielkiego kwantyfikatora 'dla każdego'",
      "procedura/algorytm, w wyniku której uzyskuje się listę najbardziej ogólnych podstawień sprawiających, że dwa termy stają się równoważne",
      "procedura nazwana też skolemizacją zastępująca kwantyfikator mały 'istnieje'"
  ],
  correct: 2
},
{
question: "Wzór na odpowiedź naiwnego klasyfikatora bayesowskiego można zapisać następująco",
        options: [
            "y* = arg max ∏ P(X_j = x_j | Y = y) P(Y = y)",
            "y* = arg max ∏ P(Y = y | X_j = x_j) + P(Y = y)",
            "y* = arg max ∏ P(Y = y | X_j = x_j) P(Y = y)",
            "y* = arg max ∏ P(X_j = x_j | Y = y) + P(Y = y)"
        ],
        correct: 0
    },
    {
        question: "Wskaż prawdziwe zdanie na temat metody uczenia RPROP dla sieci neuronowych",
        options: [
            "zaniedbywany jest znak gradientu",
            "zaniedbywany jest współczynnik uczenia",
            "zaniedbywana jest wielkość gradientu",
            "żadna z pozostałych odpowiedzi nie jest prawdziwa"
        ],
        correct: 2
    },
    {
      question: "Algorytm rezolucji działa zgodnie z zasadą: Jeżeli baza wiedzy (teza) A1, A2,…, An jest niesprzeczna i prawdziwa, to",
      options: [
          "formuła B jest wnioskiem z bazy wiedzy wtedy i tylko wtedy, gdy teza A1, A2,…, An, ¬B jest sprzeczna",
          "formuła B jest wnioskiem z bazy wiedzy wtedy i tylko wtedy, gdy teza A1, A2,…, An, ¬B jest sprzeczna",
          "formuła B jest wnioskiem z bazy wiedzy wtedy i tylko wtedy, gdy teza A1, A2,…, An, ¬B jest prawdziwa (niesprzeczna)",
          "formuła B jest wnioskiem z bazy wiedzy wtedy i tylko wtedy, gdy teza A1, A2,…, An, B jest sprzeczna"
      ],
      correct: 0
  },
  {
      question: "Przykładem zdania w logice predykatów pierwszego rzędu w koniunkcyjnej postaci normalnej (CNF) jest",
      options: [
          "¬pompeian(x) roman(x)",
          "¬roman(x2) loyalt(x2, Caesar) hate(x2, Caesar)",
          "x (man(x) good(x))",
          "x roman(x) loyalt(x, Caesar) hate(x, Caesar)"
      ],
      correct: 1
  }
];

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedSummaryQuestion, setSelectedSummaryQuestion] = useState(null);
  const [score, setScore] = useState(0);

  const handleNumQuestionsChange = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= questions.length) {
      setNumQuestions(value);
    }
  };

  const handleStartQuiz = () => {
    const selectedQuestions = shuffle(questions).slice(0, numQuestions);
    setShuffledQuestions(selectedQuestions);
    setAnswers(new Array(numQuestions).fill(null));
    setCurrentQuestion(0);
    setShowResult(false);
    setStartQuiz(true);
  };

  const handleAnswer = (index) => {
    setSelectedOption(index);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = {
        question: shuffledQuestions[currentQuestion].question,
        options: shuffledQuestions[currentQuestion].options,
        selected: index,
        correct: shuffledQuestions[currentQuestion].correct,
      };
      return newAnswers;
    });
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
    setSelectedOption(answers[index]?.selected ?? null);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]?.selected ?? null);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    if (window.confirm("Czy na pewno chcesz zakończyć quiz?")) {
      let calculatedScore = 0;
      answers.forEach((answer) => {
        if (answer && answer.selected === answer.correct) {
          calculatedScore += 1;
        }
      });
      setScore(calculatedScore);
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      {!startQuiz ? (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold">Wybierz liczbę pytań:</h2>
          <input
            type="number"
            value={numQuestions}
            min="1"
            max={questions.length}
            onChange={handleNumQuestionsChange}
            className="p-2 border border-gray-400 rounded-md w-24 mt-2"
          />
          <Button className="mt-4" onClick={handleStartQuiz}>
            Rozpocznij quiz
          </Button>
        </Card>
      ) : (
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
                      <p><strong>Twoja odpowiedź:</strong> {answers[selectedSummaryQuestion].selected !== null 
                        ? answers[selectedSummaryQuestion].options[answers[selectedSummaryQuestion].selected] 
                        : "Brak odpowiedzi"}
                      </p>
                      <p><strong>Poprawna odpowiedź:</strong> {answers[selectedSummaryQuestion].options[answers[selectedSummaryQuestion].correct]}</p>
                    </>
                  ) : (
                    <>
                      <p style={{ color: "red", fontWeight: "bold" }}>Nie odpowiedziałeś na to pytanie.</p>
                      <p><strong>Poprawna odpowiedź:</strong> {shuffledQuestions[selectedSummaryQuestion]?.options[shuffledQuestions[selectedSummaryQuestion]?.correct]}</p>
                    </>
                  )}
                  <Button onClick={() => setSelectedSummaryQuestion(null)}>Zamknij</Button>
                </div>
              ) : (
                <p className="info-text">Kliknij pytanie w siatce, aby zobaczyć szczegóły.</p>
              )}
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
                        checked={selectedOption === index}
                        onChange={() => handleAnswer(index)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <div className="navigation-buttons">
                  <Button className="nav-button" onClick={() => goToQuestion(currentQuestion - 1)} disabled={currentQuestion === 0}>⬅ Poprzednie</Button>
                  <Button className="nav-button" onClick={nextQuestion} disabled={selectedOption === null}>
                    {currentQuestion + 1 === shuffledQuestions.length ? "Zakończ test" : "Następne ➡"}
                  </Button>
                </div>
                <Button className="end-button" onClick={endQuiz}>Zakończ quiz teraz</Button>
              </CardContent>
            </Card>
          ) : (
            <p>Ładowanie pytań...</p>
          )}
        </div>
      )}
      <div className="summary-grid">
        {shuffledQuestions.map((_, index) => {
          let statusClass = "";

          if (!showResult) {
            statusClass = answers[index]?.selected !== undefined ? "answered" : "neutral";
          } else if (answers[index]) {
            if (answers[index].selected === answers[index].correct) {
              statusClass = "correct"; 
            } else if (answers[index].selected !== null) {
              statusClass = "incorrect"; 
            } else {
              statusClass = "unanswered"; 
            }
          }
          return (
            <div
              key={index}
              className={`summary-box ${statusClass} ${index === currentQuestion ? "active-question" : ""}`}
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