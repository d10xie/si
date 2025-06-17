import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { Card, CardContent } from './components/ui/card/card';
import { Button } from './components/ui/button/button';
import sm from './questions/sm.json';
import si from './questions/si.json';
import sw from './questions/sw.json';
import po from './questions/po.json';

const allQuestionSets = {
  sm,
  si,
  sw,
  po
};

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
  const [learningMode, setLearningMode] = useState(false);

  const shuffledQuestions = useMemo(() => {
    if (!startQuiz) return [];
    return questions.map(q => ({
      ...q,
      options: shuffle(q.options),
    }));
  }, [questions, startQuiz]);

const handleCheckAnswer = () => {
  const newAnswers = [...answers];
  if (!newAnswers[currentQuestion]) return;
  newAnswers[currentQuestion].showFeedback = true;
  setAnswers(newAnswers);
};


  const handleNumQuestionsChange = (e) => {
    let value = parseInt(e.target.value);
    const totalAvailable = selectedSets.reduce((sum, set) => sum + allQuestionSets[set].length, 0);
    if (!isNaN(value) && value > 0 && value <= totalAvailable)
    {
      setNumQuestions(value);
    }
  };

  const [selectedSets, setSelectedSets] = useState(['multimedia']);

  const handleSetChange = (e) => {
  const value = e.target.value;
  if (selectedSets.includes(value)) {
    setSelectedSets(selectedSets.filter(s => s !== value));
  } else {
    setSelectedSets([...selectedSets, value]);
  }
  };


useEffect(() => {
  const totalAvailable = selectedSets.reduce((sum, set) => sum + allQuestionSets[set].length, 0);
  if (numQuestions > totalAvailable) {
    setNumQuestions(totalAvailable);
  }
}, [selectedSets]);


const handleStartQuiz = () => {
  const combinedQuestions = selectedSets.flatMap(set => allQuestionSets[set]);
  if (combinedQuestions.length === 0) {
    alert("Brak pytań w wybranym zestawie.");
    return;
  }
  const selectedQuestions = shuffle(combinedQuestions).slice(0, numQuestions);
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
    showFeedback: currentAnswer?.showFeedback || false,
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
  
  const handleRestartSameSettings = () => {
  const combinedQuestions = selectedSets.flatMap(set => allQuestionSets[set]);
  const selectedQuestions = shuffle(combinedQuestions).slice(0, numQuestions);
  setQuestions(selectedQuestions);
  setAnswers(new Array(numQuestions).fill(null));
  setCurrentQuestion(0);
  setShowResult(false);
  setStartQuiz(true);
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
    const allOptions = Object.keys(allQuestionSets);
    const totalAvailable = selectedSets.reduce((sum, set) => sum + allQuestionSets[set].length, 0);

    return (
      <div className="quiz-container">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold">Wybierz liczbę pytań:</h2>
          <p className="text-gray-600">Dostępnych pytań: {totalAvailable}</p>
          <div className="mt-2">
  <input
    type="range"
    min="1"
    max={totalAvailable}
    value={numQuestions}
    onChange={handleNumQuestionsChange}
    className="w-full"
  />
  <div className="flex items-center justify-center gap-2 mt-1">
    <label htmlFor="manualNum" className="text-sm">Liczba pytań:</label>
    <input
      id="manualNum"
      type="number"
      min="1"
      max={totalAvailable}
      value={numQuestions}
      onChange={handleNumQuestionsChange}
      className="p-1 border rounded w-20 text-center"
    />
    <span className="text-sm text-gray-500">z {totalAvailable}</span>
  </div>
</div>


          <div className="mt-4 text-left">
            <p className="font-bold">Wybierz zestawy pytań:</p>
{allOptions.map((set) => (
  <label key={set} className="block mt-2">
    <input
      type="radio"
      name="questionSet"
      value={set}
      checked={selectedSets.includes(set)}
      onChange={() => setSelectedSets([set])}
      className="mr-2"
    />
    {{
      multimedia: "Systemy Multimedialne",
      si: "Sztuczna Inteligencja",
      sw: "Systemy Wbudowane",
      po: "Projektowanie Oprogramowania"
    }[set]}
  </label>
))}

          </div>

          <Button className="mt-4" onClick={handleStartQuiz} disabled={selectedSets.length === 0}>
            Rozpocznij quiz
          </Button>
          <div className="mt-4">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={learningMode}
      onChange={(e) => setLearningMode(e.target.checked)}
    />
    Tryb nauki (od razu pokazuj poprawną odpowiedź, brak punktów)
  </label>
</div>

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

  const showFeedbackClass = (optionIndex) => {
  const answer = answers[currentQuestion];
  const question = shuffledQuestions[currentQuestion];
  if (!learningMode || !answer?.showFeedback) return "";

  const isSelected = answer.selected.includes(optionIndex);
  const optionText = question.options[optionIndex];
  const isCorrect = question.correct.includes(optionText);

  if (isSelected && isCorrect) return "correct-option";
  if (isSelected && !isCorrect) return "incorrect-option";
  if (!isSelected && isCorrect) return "missed-correct";
  return "";
};


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
    <h3 className="text-lg font-bold">
      {shuffledQuestions[selectedSummaryQuestion]?.question}
    </h3>

    {answers[selectedSummaryQuestion] ? (
      <>
        <p><strong>Twoja odpowiedź:</strong></p>
        <ul className="clean-list">
          {answers[selectedSummaryQuestion].selected.length > 0
            ? answers[selectedSummaryQuestion].selected.map(i => (
                <li key={i}>{answers[selectedSummaryQuestion].options[i]}</li>
              ))
            : <li>Brak odpowiedzi</li>
          }
        </ul>

        <p><strong>Poprawna odpowiedź:</strong></p>
        <ul className="clean-list">
          {answers[selectedSummaryQuestion].correct.map((opt, idx) => (
            <li key={idx}>{opt}</li>
          ))}
        </ul>
      </>
    ) : (
      <>
        <p style={{ color: "red", fontWeight: "bold" }}>Nie odpowiedziałeś na to pytanie.</p>
        <p><strong>Poprawna odpowiedź:</strong></p>
        <ul className="clean-list">
          {shuffledQuestions[selectedSummaryQuestion]?.correct.map((opt, idx) => (
            <li key={idx}>{opt}</li>
          ))}
        </ul>
      </>
    )}

    <Button onClick={() => setSelectedSummaryQuestion(null)}>Zamknij</Button>
  </div>
) : (
  <p className="info-text">Kliknij pytanie w siatce, aby zobaczyć szczegóły.</p>
)}

            <div className="flex flex-col gap-2 mt-4">
  <Button onClick={handleRestartSameSettings}>Zagraj ponownie</Button>
  <Button variant="outline" onClick={handleRestartQuiz}>Wróć do wyboru</Button>
</div>
          </Card>
        ) : shuffledQuestions.length > 0 ? (
          <Card className="p-6 w-96 fixed-size">
            <CardContent>
              <h3 className="question-counter">Pytanie {currentQuestion + 1} / {shuffledQuestions.length}</h3>
              <h2 className="text-lg font-bold question-text">{shuffledQuestions[currentQuestion]?.question}</h2>
<div className="options-container">
  {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
    <label key={index} className={`option-label ${showFeedbackClass(index)}`}>
      <input
        type="checkbox"
        checked={answers[currentQuestion]?.selected?.includes(index) || false}
        onChange={() => handleAnswer(index)}
      />
      {option}
    </label>
  ))}

  {learningMode && !answers[currentQuestion]?.showFeedback && (
    <Button className="mt-2" onClick={handleCheckAnswer} disabled={!answers[currentQuestion]?.selected?.length}>
      Sprawdź odpowiedź
    </Button>
  )}
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
