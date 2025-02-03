import "./App.css";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card/card.jsx";
import { Button } from "./components/ui/button/button.jsx";

const shuffle = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
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
    correct: 0,
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
    correct: 2,
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
    correct: 2,
  },
  {
    question:
      "Algorytm 'przycinanie α-β' odwiedzi pewien stan, jeżeli aktualnie spełniona jest zależność:",
    options: ["α < β", "α ≤ β", "α > β", "α ≥ β"],
    correct: 1,
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
    correct: 0,
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
    correct: 0,
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
    correct: 3,
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
    correct: 0,
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
    correct: 2,
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
    correct: 1,
  },
  {
    question:
      "Dla układanki puzzle przesuwne postaci (1,0,5;3,2,4;6,7,8) wartość heurystyki 'Manhattan' wynosi:",
    options: ["2", "3", "4", "5"],
    correct: 2,
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
    correct: 0,
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
    correct: 0,
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
    correct: 3,
  },
  {
    question:
      "Zgodnie z dowodem twierdzenia Novikoffa, jeżeli zbiór danych jest liniowo separowalny, to algorytm perceptronu wykona nie więcej kroków niż:",
    options: ["R² / y'²", "R / y'", "R² * y'²", "y'² / R²"],
    correct: 0,
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
    correct: 1,
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
    correct: 0,
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
    correct: 2,
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
    correct: 0,
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
    correct: 3,
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
      "b^D w przypadku pesymistycznym",
      "√(b^D) w przypadku pesymistycznym",
      "b^D w przypadku pesymistycznym",
      "√(b^D) w przypadku optymistycznym",
    ],
    correct: 3,
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
    correct: 0
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
    correct: 2
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
    correct: 2
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
    correct: 0
  },
  {
    question: "Zgodnie z dowodem twierdzenia Novikoffa, warunki ściskające na iloczyn skalarny ω(k), ω* mają postać:",
    options: [
      "kγ'min ≥ ω(k), ω* ≥ √kRmax",
      "kγ'²min ≥ ω(k), ω* ≥ √kR²max",
      "kγ'min ≤ ω(k), ω* ≥ √kRmax",
      "kγ'²min ≤ ω(k), ω* ≥ √kR²max"
    ],
    correct: 0
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
    correct: 2
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
    correct: 2
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
  "question": "W pewnym algorytmie genetycznym (maksymalizującym) mamy 4 osobników o przystosowaniach f1 =5, f2=0, f3=10, f4=1. Prawdopodobieństwo sukcesu tych osobników wyniosą: W selekcji rankingowej: 3/10, 1/10, 4/10, 2/10 W selekcji ruletkowej: 5/16, 0, 10/16, 1/16",
  "options": [
    "Prawda",
    "Fałsz"
  ],
  "correct": 0
},
{
    "question": "W pewnym algorytmie genetycznym (maksymalizującym) mamy 4 osobników o przystosowaniach f1 =5, f2=0, f3=10, f4=1. Prawdopodobieństwo sukcesu tych osobników wyniosą: W selekcji rankingowej: 3/10, 1/10, 4/10, 2/10 W selekcji ruletkowej: 5/16, 0, 10/16, 1/16",
    "options": ["Prawda", "Fałsz"],
    "correct": 0
  },
  {
    "question": "Algorytmy genetyczne służą do rozwiązywania zadań:",
    "options": ["aproksymacji", "optymalizacji", "klasyfikacji binarnej", "klasyfikacji"],
    "correct": 1
  },
  {
    "question": "Algorytmy genetyczne nie wymagają:",
    "options": [
      "generowania liczb losowych",
      "informacji o wartości funkcji optymalizowanej w punkcie",
      "informacji o pochodnej funkcji optymalizowanej w punkcie",
      "selekcji rozwiązań – kandydatów"
    ],
    "correct": 2
  },
  {
    "question": "Uczenie sieci neuronowej w trybie on-line oznacza, że: Poprawki następują od razu po obejrzeniu pojedynczego przykładu",
    "options": ["Prawda", "Fałsz"],
    "correct": 0
  },
  {
    "question": "W pewnym algorytmie genetycznym mamy czterech osobników o przystosowaniach f(x1 ) = 2, f(x2 ) = 1, f(x3 ) = 4, f(x4 ) = 9 . Odpowiadające im prawdopodobieństwa sukcesji w selekcji ruletkowej to:",
    "options": ["2/9, 1/9, 4/9, 9/9", "2/16, 1/16, 4/16, 9/16", "0,0,0,1", "2/10, 1/10, 3/10, 4/10"],
    "correct": 1
  },
  {
    "question": "W ramach poprzedniego zadania oczekiwana liczba kopii osobnika x1 po selekcji wynosi?",
    "options": ["1", "2", "12", "½"],
    "correct": 0
  },
  {
    "question": "W pewnym algorytmie genetycznym mamy 4 osobników o następujących przystosowaniach f(x1 ) = 2, f(x2 ) = 1, f(x3 ) = 4, f(x4 ) = 3. Odpowiadające im prawdopodobieństwa sukcesji dla selekcji rankingowej wynoszą:",
    "options": ["2/16, 1/16, 4/16, 3/16", "2/4, 1/4, 4/4, 3/4", "0, 0, 0, 1", "2/10, 1/10, 4/10, 3/10"],
    "correct": 3
  },
  {
    "question": "Dla warunków z poprzedniego zadania, oczekiwana liczba kopii x1 po selekcji wynosi:",
    "options": ["4/10", "1/4", "4/5 - suma oczekiwanych liczb kopii dla wszystkich osobników powinna być równa liczbie osobników", "4* 2/10"],
    "correct": 3
  },
  {
    "question": "O sigmoidalnej funkcji aktywacji można powiedzieć, że: jest wszędzie różniczkowalna, jest ściśle rosnąca",
    "options": ["Prawda", "Fałsz"],
    "correct": 0
  },
  {
    "question": "W pewnym algorytmie genetycznym ma zostać skrzyżowana następująca para rodziców (0,0,1,0,1,1,0,1) i (1,1,1,1,1,0,0,1). Wylosowano punkt krzyżowania jako punkt pomiędzy trzecim i czwartym bitem. W rezultacie otrzymamy:",
    "options": [
      "jednego potomka (0,0,1,1,1,0,0,1)",
      "jednego potomka (1,1,1,0,1,1,0,1)",
      "dwóch potomków (0,0,1,1,1,0,0,1) i (1,1,1,0,1,1,0,1)",
      "ci rodzice nie mogą zostać skrzyżowani"
    ],
    "correct": 2
  },
  {
    "question": "W perceptronie prostym do poprawki wag w danym kroku mogą być wybrane:",
    "options": ["jedynie przykłady źle sklasyfikowane", "wszystkie przykłady", "losowe przykłady", "żadne z powyższych"],
    "correct": 0
  },
  {
    "question": "W perceptronie prostym wektor wag w = (1, 2, 3, 4) ma być poprawiony na podstawie pary uczącej x = (1, 0, 1, -1), y = 1 przy współczynniku uczenia eta = 1.0. Prawdziwe jest następujące stwierdzenie: powstanie wektor wynikowy w = (2, 2, 4, 3)",
    "options": ["Prawda", "Fałsz"],
    "correct": 0
  },
  {
    "question": "Jeżeli zbiór danych nie jest liniowo-separowalny, to algorytm uczenia perceptronu prostego:",
    "options": ["nie zatrzyma się", "zatrzyma się", "zawsze działa poprawnie", "nie działa poprawnie"],
    "correct": 0
  },
  {
    "question": "Uczenie sieci neuronowej w trybie off-line oznacza, że poprawki następują dopiero po obejrzeniu wszystkich przykładów",
    "options": ["Prawda", "Fałsz"],
    "correct": 0
  },
  {
    "question": "W selekcji turniejowej z turniejem o rozmiarze równym rozmiarowi populacji, nowa populacja:",
    "options": ["napełnia się najlepszym osobnikiem", "losuje najlepszych", "zawsze wybiera nowych osobników", "tworzy nowe osobniki"],
    "correct": 0
  },
  {
    "question": "Algorytmy genetyczne (AG) próbują poszukiwać:",
    "options": ["miejsc zerowych", "optymów lokalnych", "rozwiązań stabilnych", "żadne z powyższych"],
    "correct": 1
  },
  {
    "question": "Przykładowym zastosowaniem perceptronu prostego może być:",
    "options": ["Kompresja stratna zdjęć", "Wyznaczanie najkrótszej ścieżki", "Kreślenie linii w grafice 2D", "Filtr antyspamowy"],
    "correct": 3
  },
  {
    "question": "W „przycinaniu alfa-beta” analizowany jest pewien stan typu MAX, dla którego procedurę wywołano z początkowymi wartościami alfa=10, beta=11. Przypuśćmy, że wartości zwracane dla tego stanu ze stanów potomnych będą wynosiły kolejno: 5,10,11,12,13. Można powiedzieć, że:",
    "options": [
      "Sytuacja ta jest niemożliwa ze względu na wartość pierwszego potomka 5 < alfa",
      "Przycięcie nastąpi po pierwszym potomku",
      "Po drugim potomku",
      "Po trzecim potomku"
    ],
    "correct": 2
  },
  {
    "question": "Algorytm „przycinanie alfa-beta” uruchomiono dla gry „kółko i krzyżyk”, generując stany potomne aż do maksymalnej możliwej głębokości i oceniając terminale jedną z trzech możliwych wartości: -inf, 0, inf. Można powiedzieć, że:",
    "options": [
      "Algorytm wykryje optymalną sekwencję ruchów, ale przycięcia nie wystąpią",
      "Algorytm wykryje optymalną sekwencję ruchów i przycięcia wystąpią",
      "Algorytm nie wykryje optymalnej sekwencji ruchów i przycięcia nie wystąpią",
      "Algorytm nie wykryje optymalnej sekwencji ruchów, ale przycięcia wystąpią"
    ],
    "correct": 1
  },
  {
    "question": "Suma ważona obliczana w perceptronie prostym to inaczej:",
    "options": [
      "Iloczyn skalarny wektora danych i wektora wag",
      "Iloczyn wektorowy wektora danych i wektora wag",
      "Norma wektora danych",
      "Norma wektora wag"
    ],
    "correct": 0
  },
  [
  {
    "question": "Funkcję aktywacji w perceptronie prostym można określić jako funkcję:",
    "options": ["Sigmoidalną", "Ciągłą", "Stałą", "Schodkową"],
    "correct": 3
  },
  {
    "question": "Algorytm uczenia dla perceptronu prostego można scharakteryzować jako algorytm:",
    "options": ["On-line", "Zachłanny", "Rekurencyjny", "Dziel i zwyciężaj"],
    "correct": 0
  },
  {
    "question": "Jeżeli zbiór danych jest liniowo-separowalny, to algorytm uczenia perceptronu prostego:",
    "options": [
      "Nie zatrzyma się",
      "Odwiedzi wszystkie przykłady uczące",
      "Odwiedzi tylko podzbiór przykładów uczących",
      "Odpowiednio wyznaczy klasy"
    ],
    "correct": 1
  },
  {
    "question": "Jeżeli sieć neuronowa MLP rozwiązuje zadanie estymacji regresji, to o wartościach yi dla przykładów uczących można powiedzieć, że:",
    "options": ["Są ze zbioru {-1,1}", "Są naturalne", "Są rzeczywiste", "Są nieznane"],
    "correct": 2
  },
  {
    "question": "Jeżeli sprawdzenie, czy stan był odwiedzony, ma złożoność O(1), to jest to operacja realizowana:",
    "options": ["W miejscu", "W czasie stałym", "W czasie liniowym", "W 1 przebiegu pętli"],
    "correct": 1
  },
  {
    "question": "Zbiór Closed realizowany przez mapę haszującą można zastąpić zwykłą tablicą, jeżeli:",
    "options": [
      "Graf nie ma cykli",
      "Graf ma co najwyżej 1 cykl",
      "Liczba węzłów jest znana",
      "Liczba krawędzi jest znana"
    ],
    "correct": 0
  },
  {
    "question": "Puzzle przesuwane można zaliczyć do grafowych problemów poszukiwania:",
    "options": [
      "Najkrótszej ścieżki",
      "Ścieżki Hamiltona",
      "Ścieżki Eulera",
      "Porządku topologicznego"
    ],
    "correct": 0
  },
  {
    "question": "W problemie jeepa rozwiązanie dla n=2 wynosi:",
    "options": [
      "1+ ½",
      "1 + 1/3",
      "1 + 1/3 + 1/3",
      "1 + sqrt(2)/2"
    ],
    "correct": 1
  },
  {
    "question": "Problem komiwojażera to inaczej problem znalezienia:",
    "options": [
      "Najkrótszego cyklu Hamiltona",
      "Najkrótszego cyklu Eulera",
      "Najkrótszej ścieżki Hamiltona",
      "Najkrótszej ścieżki Eulera"
    ],
    "correct": 0
  },
  {
    "question": "„Iterowany dylemat więźnia” redukuje się indukcyjnie do pojedynczego dylematu więźnia, jeżeli:",
    "options": [
      "Gracze cały czas współpracują",
      "Gracze cały czas zdradzają",
      "Gracze grają wet za wet",
      "Liczba rund jest znana z góry"
    ],
    "correct": 3
  },
  {
    "question": "W „grze w życie” Conwaya pusta komórka przeradza się w pełną, jeżeli ma:",
    "options": [
      "Dokładnie 2 sąsiadów",
      "Dokładnie 3 sąsiadów",
      "Dokładnie 2 lub 3 sąsiadów",
      "Żadne z powyższych"
    ],
    "correct": 1
  },
  {
    "question": "Zdaniem Turinga problem „czy maszyny mogą myśleć?” można rozstrzygnąć tylko przez napisanie programu:",
    "options": [
      "Grającego w naśladownictwo",
      "Grającego w szachy",
      "Komponującego utwory muzyczne",
      "Żadne z powyższych"
    ],
    "correct": 0
  },
  {
    "question": "Filtr antyspamowy jest przykładem zadania:",
    "options": [
      "Rozpoznawania wzorców",
      "Klasteryzacji binarnej",
      "Przeszukiwania grafu",
      "Indukcji reguł decyzyjnych"
    ],
    "correct": 0
  },
  {
    "question": "Jako konwencję przyjmuje się, że funkcje heurystyczne w algorytmach grafowych są:",
    "options": [
      "Dodatnie",
      "Nieujemne",
      "Ściśle monotoniczne",
      "Różnowartościowe"
    ],
    "correct": 1
  },
  {
    "question": "Wskaż grupę algorytmów reprezentujących niepoinformowane techniki przeszukiwania grafów:",
    "options": [
      "Best-first search, A*, IDA*",
      "Breadth-first search, Depth-first search, algorytm Dijkstry",
      "Algorytm Dijkstry, Best-first search, A*",
      "Breadth-first search, Depth-first search, Best-first search"
    ],
    "correct": 1
  },
  {
    "question": "W sieci bayesowskiej węzły reprezentują:",
    "options": [
      "Wpływ potomków na rodziców",
      "Zmienne losowe",
      "Tylko prawdopodobieństwo a priori zdarzeń",
      "Wpływ jednego zdarzenia na inne"
    ],
    "correct": 1
  },
  {
    "question": "Algorytmy genetyczne są przeznaczone do:",
    "options": [
      "Rozwiązywania problemów optymalizacji w sposób przybliżony",
      "Rozwiązywania problemów klasyfikacji w sposób przybliżony",
      "Rozwiązywania problemów klasyfikacji w sposób dokładny",
      "Rozwiązywania problemów optymalizacji w sposób dokładny"
    ],
    "correct": 0
  },
  {
    "question": "W sieci bayesowskiej węzły reprezentują:",
    "options": [
      "Wpływ potomków na rodziców",
      "Zmienne losowe",
      "Tylko prawdopodobieństwo a priori zdarzeń",
      "Wpływ jednego zdarzenia na inne"
    ],
    "correct": 1
  },
  {
    "question": "W perceptronie prostym aktualny wektor wag wynosi (3, 1, -2, 2). Do poprawki wybrano przykład xi = (1, 2, 1, 2). Wynika z tego, że:",
    "options": [
      "yi = -1",
      "yi = 1",
      "Nie można wywnioskować klasy",
      "Algorytm nie zatrzyma się"
    ],
    "correct": 1
  },
  {
    "question": "Wskaż grupę algorytmów reprezentujących niepoinformowane techniki przeszukiwania grafów:",
    "options": [
      "Best-first search, A*, IDA*",
      "Breadth-first search, Depth-first search, algorytm Dijkstry",
      "Algorytm Dijkstry, Best-first search, A*",
      "Breadth-first search, Depth-first search, Best-first search"
    ],
    "correct": 1
  },
  {
    "question": "W grze w „iterowany dylemat więźnia”:",
    "options": [
      "Liczba rund nie powinna być znana graczom z góry",
      "Racjonalnym wyborem w każdej rundzie jest: zdradzić",
      "Racjonalnym wyborem w każdej rundzie jest: milczeć",
      "Najlepszą strategią jest „wet za wet”"
    ],
    "correct": 0
  },
  {
    "question": "Powiedzmy, że pewna sztuczna inteligencja do gry w szachy pracuje z użyciem nastaw: „przycinanie alpha-beta” + głębokość 3.5 + quiescence + tablica transpozycji. Wskaż zmianę, która statystycznie spowoduje największe pogorszenie jakości gry tej sztucznej inteligencji:",
    "options": [
      "Wyłączenie tablicy transpozycji",
      "Obniżenie głębokości do 3.0",
      "Przełączenie algorytmu na „MIN-MAX”",
      "Wyłączenie quiescence"
    ],
    "correct": 1
  },
  {
    "question": "Co to jest baza wiedzy?",
    "options": [
      "Zbiór zdań w języku formalnym np. w języku opartym na paradygmatach logiki zależny od opisywanej dziedziny/obszaru",
      "Element systemu, który zarządza danymi najczęściej w architekturze klient-serwer",
      "Zbiór danych zapisanych zgodnie z określonymi regułami, np w postaci tabeli wypełnionej wartościami",
      "Element systemu, który stosuje zasady logiczne by wydedukować nowe informacje"
    ],
    "correct": 0
  },
  {
    "question": "Dla układanki puzzle przesuwane postaci (cyfry pisane kolejno wierszami): (7, 0, 8; 6, 5, 4; 3, 1, 2) wartość heurystyki \"Manhattan\" wynosi:",
    "options": [
      "12",
      "13",
      "11",
      "14"
    ],
    "correct": 1
  },
  {
    "question": "Baza wiedzy to:",
    "options": [
      "Element systemu, który zarządza danymi najczęściej w architekturze klient-serwer",
      "Element systemu, który stosuje procedury by wyedukować nowe informacje",
      "Zbiór danych w postaci tabeli z atrybutami i decyzją",
      "Zbiór zdań w języku formalnym np. w języku opartym na paradygmatach logiki"
    ],
    "correct": 3
  },
  {
    "question": "Jeśli w przycinaniu alfa-beta analizowany jest pewien stan, w którym procedura zwraca wartości kolejno 5, 10, 11, 12, 13, to można powiedzieć, że:",
    "options": [
      "Sytuacja ta jest niemożliwa ze względu na wartość pierwszego potomka 5 < alfa",
      "Przycięcie nastąpi po pierwszym potomku",
      "Po drugim potomku",
      "Po trzecim potomku"
    ],
    "correct": 2
  },
  {
    "question": "W perceptronie prostym wektor wag w = (1, 2, 3, 4) ma być poprawiony na podstawie pary uczącej x = (1, 0, 1, -1), y = 1 przy współczynniku uczenia eta = 1.0. Prawdziwe jest następujące stwierdzenie:",
    "options": [
      "Powstanie wektor wynikowy w = (2, 2, 4, 3)",
      "Nie zmieni się",
      "Będzie mniejszy",
      "Będzie większy"
    ],
    "correct": 0
  },
  {
    "question": "Jeżeli zbiór danych nie jest liniowo-separowalny, to algorytm uczenia perceptronu prostego:",
    "options": [
      "Nie zatrzyma się",
      "Zatrzyma się",
      "Nie działa poprawnie",
      "Działa poprawnie"
    ],
    "correct": 0
  },
  {
    "question": "W perceptronie prostym aktualny wektor wag wynosi (3, 1, -2, 2). Do poprawki wybrano przykład xi = (1, 2, 1, 2). Wynika z tego, że:",
    "options": [
      "yi = -1",
      "yi = 1",
      "Nie można wywnioskować klasy",
      "Algorytm nie zatrzyma się"
    ],
    "correct": 1
  },
  {
    "question": "W algorytmie A* heurystyka używana do oceny stanu powinna być:",
    "options": [
      "Zawsze dokładna",
      "Monotoniczna i dopuszczalna",
      "Dowolna, jeśli algorytm działa poprawnie",
      "Nieujemna i różnowartościowa"
    ],
    "correct": 1
  },
  {
    "question": "W układance puzzle przesuwane, wartość heurystyki \"Manhattan\" określa:",
    "options": [
      "Liczbę kafelków na niewłaściwych pozycjach",
      "Minimalną liczbę przesunięć do rozwiązania",
      "Sumę odległości każdego kafelka do jego miejsca docelowego",
      "Najkrótszą ścieżkę do rozwiązania"
    ],
    "correct": 2
  },
  {
  {
    "question": "Jeżeli algorytm A* używa jako heurystyki dolnego ograniczenia na odległość do celu, to:",
    "options": [
      "Nie gwarantuje on znalezienia najkrótszej ścieżki",
      "Gwarantuje on znalezienie najkrótszej ścieżki",
      "Nie wymaga on zbioru Closed",
      "Jest on wolniejszy niż algorytm Dijkstry"
    ],
    "correct": 1
  },
  {
    "question": "Dana jest reguła: IF zdarzenie A [LS=2.0, LN=0.3] THEN zdarzenie B P(jp)=0.5. Jeżeli podano dowód, że zdarzenie A zaistniało, to:",
    "options": [
      "Poprzez swoją wartość współczynnik LS zmniejszy przekonanie o prawdopodobieństwie zdarzenia B",
      "Poprzez swoją wartość współczynnik LN zwiększy przekonanie o prawdopodobieństwie zdarzenia B",
      "Prawdopodobieństwo zdarzenia B nie zmieni się.",
      "Poprzez swoją wartość współczynnik LS zwiększy przekonanie o prawdopodobieństwie zdarzenia B"
    ],
    "correct": 3
  },
  {
    "question": "W sieci bayesowskiej węzły reprezentują:",
    "options": [
      "Wpływ potomków na rodziców",
      "Zmienne losowe",
      "Tylko prawdopodobieństwo a priori zdarzeń",
      "Wpływ jednego zdarzenia na inne"
    ],
    "correct": 1
  },
  {
    "question": "Baza wiedzy w systemie eksperckim zawiera:",
    "options": [
      "Zbiór reguł i faktów",
      "Mechanizm wnioskowania",
      "Interfejs użytkownika",
      "Zbiór procedur matematycznych"
    ],
    "correct": 0
  },
  {
    "question": "W algorytmie genetycznym selekcja rankingowa oznacza:",
    "options": [
      "Losowy wybór osobników",
      "Wybór najlepszych osobników do reprodukcji",
      "Zwiększenie różnorodności populacji",
      "Mutację na podstawie wartości funkcji przystosowania"
    ],
    "correct": 1
  },
  {
    "question": "Heurystyka dopuszczalna w algorytmie A* oznacza, że:",
    "options": [
      "Może przekraczać rzeczywisty koszt",
      "Zawsze zwraca dokładny koszt",
      "Nigdy nie przeszacowuje kosztu",
      "Jest dowolną funkcją kosztu"
    ],
    "correct": 2
  },
  {
    "question": "Algorytmy genetyczne stosuje się do:",
    "options": [
      "Rozwiązywania problemów optymalizacyjnych",
      "Analizy danych statystycznych",
      "Szybkiego sortowania",
      "Rozpoznawania twarzy"
    ],
    "correct": 0
  },
  {
    "question": "W perceptronie prostym suma ważona wejść jest przekształcana przez:",
    "options": [
      "Funkcję sigmoidalną",
      "Funkcję schodkową",
      "Funkcję liniową",
      "Funkcję Gaussa"
    ],
    "correct": 1
  },
  {
    "question": "Metoda backpropagation stosowana jest w:",
    "options": [
      "Algorytmach heurystycznych",
      "Sieciach neuronowych",
      "Sortowaniu danych",
      "Grafach planarnych"
    ],
    "correct": 1
  },
  {
    "question": "Jeżeli w sieci neuronowej warstwa ukryta ma zbyt mało neuronów, to:",
    "options": [
      "Sieć może nie nauczyć się dobrze",
      "Sieć działa szybciej",
      "Sieć działa dokładniej",
      "Sieć nie wymaga uczenia"
    ],
    "correct": 0
  },
  {
    "question": "W perceptronie wielowarstwowym aktywacja neuronu zależy od:",
    "options": [
      "Wagi połączeń",
      "Losowości",
      "Poprzedniej aktywacji",
      "Zmiennej globalnej"
    ],
    "correct": 0
  },
  {
    "question": "Jeżeli zbiór Closed w algorytmie A* jest zbyt duży, to:",
    "options": [
      "Algorytm działa szybciej",
      "Zużywa więcej pamięci",
      "Wyniki są niedokładne",
      "Heurystyka jest błędna"
    ],
    "correct": 1
  },
  {
    "question": "W sieciach neuronowych nadmierne dopasowanie do danych treningowych prowadzi do:",
    "options": [
      "Przewagi w testach",
      "Lepszej generalizacji",
      "Przeuczenia modelu",
      "Szybszej konwergencji"
    ],
    "correct": 2
  },
  {
  "question": "Dla układanki puzzle przesuwane postaci (cyfry pisane kolejno wierszami): (1,0,5;3,2,4;6,7,8) wartość heurystyki \"Misplaced tiles\" wynosi:",
  "options": [
    "2",
    "3",
    "4",
    "5"
  ],
  "correct": 3
}
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    setShuffledQuestions(shuffle(questions));
  }, []);

  const handleAnswer = (index) => {
    setSelectedOption(index);
  };

  const nextQuestion = () => {
    setAnswers([
      ...answers,
      {
        question: shuffledQuestions[currentQuestion].question,
        selected: selectedOption,
        correct: shuffledQuestions[currentQuestion].correct,
      },
    ]);

    if (selectedOption === shuffledQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setSelectedOption(null);

    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const endQuiz = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setShuffledQuestions(shuffle(questions));
  };

  return (
    <div className="flex flex-col items-center p-6">
      {showResult ? (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold">
            Twój wynik: {score} / {shuffledQuestions.length} ({((score / shuffledQuestions.length) * 100).toFixed(2)}%)
          </h2>
          <div className="mt-4 text-left">
            <h3 className="text-lg font-semibold">Podsumowanie:</h3>
            <ul className="mt-2 list-disc list-inside pl-4">
              {answers.map((answer, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: answer.selected === answer.correct ? "#d4edda" : "#f8d7da", padding: "10px", borderRadius: "5px", marginBottom: "5px" }}
                >
                  <strong>{answer.question}</strong>
                  <br />
                  <span className="font-bold">
                    Twoja odpowiedź: {shuffledQuestions[index]?.options[answer.selected] || "Brak odpowiedzi"}
                  </span>
                  <br />
                  <span className="text-blue-600">
                    Poprawna odpowiedź: {shuffledQuestions[index]?.options[answer.correct]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={restartQuiz} className="mt-4">Spróbuj ponownie</Button>
        </Card>
      ) : (
        shuffledQuestions.length > 0 && (
          <Card className="p-6 w-96">
            <CardContent>
              <h2 className="text-lg font-bold">
                {shuffledQuestions[currentQuestion]?.question}
              </h2>
              <div className="flex flex-col gap-2 mt-4">
                {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                  <Button
                    key={index}
                    className={
                      selectedOption === index
                        ? selectedOption === shuffledQuestions[currentQuestion].correct
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "outline"
                    }
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <Button
                className="mt-4 w-full"
                onClick={nextQuestion}
                disabled={selectedOption === null}
              >
                {currentQuestion + 1 === shuffledQuestions.length ? "Zakończ test" : "Następne pytanie"}
              </Button>
              <Button className="mt-2 w-full" onClick={endQuiz}>Zakończ quiz</Button>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
