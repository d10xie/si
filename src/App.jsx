import React, { useState, useMemo } from 'react';
import './App.css';
import { Card, CardContent } from './components/ui/card/card';
import { Button } from './components/ui/button/button';


const allQuestions = [
  {
    question: 'Zasada Huygensa pozwala na',
    options: [
      'stworzenie pozornych źródeł poza obszarem odsłuchu',
      'zmniejszenie echa w przypadku nagłaśniania dużych pomieszczeń',
      'odwzorowanie przestrzennego rozkładu pola akustycznego',
      'podwyższenie jakości dźwięku kompresowanego algorytmami stratnymi',
    ],
    correct: [
      'odwzorowanie przestrzennego rozkładu pola akustycznego',
      'stworzenie pozornych źródeł poza obszarem odsłuchu',
    ],
  },
  {
    question: 'Wyróżniamy następujące rodzaje transmisji strumieniowej',
    options: [
      'Transmisja wielu-do-wielu (ang. Varicast)',
      'Transmisja rozgłoszeniowa (ang. Broadcast)',
      'Transmisja jeden-do-wielu (ang. Multicast)',
      'Transmisja jeden-do-jednego (ang. Unicast)',
    ],
    correct: [
      'Transmisja jeden-do-jednego (ang. Unicast)',
      'Transmisja jeden-do-wielu (ang. Multicast)',
      'Transmisja rozgłoszeniowa (ang. Broadcast)',
    ],
  },
  {
    question:
      'Wadą znakowania wodnego dla video wykorzystującego takie same znaki wodne dla każdej klatki jest:',
    options: [
      'problem z zachowaniem niewidzialności statystycznej,',
      'łatwość usuwania znaków wodnych,',
      'zmienny poziom szumu dla różnych klatek,',
      'duża złożoność obliczeniowa,',
    ],
    correct: ['problem z zachowaniem niewidzialności statystycznej,'],
  },
];

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
