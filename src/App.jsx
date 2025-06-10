import { useState, useMemo } from 'react';
import './App.css';


const allQuestions = [
  {
    question: 'Które z poniższych są językami programowania?',
    options: ['HTML', 'Java', 'CSS', 'Python'],
    correct: ['Java', 'Python'],
  },
  {
    question: 'Wybierz wszystkie liczby parzyste.',
    options: ['1', '2', '8', '11', '14'],
    correct: ['2', '8', '14'],
  },
  {
    question: 'Które z podanych stolic leżą w Europie?',
    options: ['Warszawa', 'Kair', 'Berlin', 'Tokio'],
    correct: ['Warszawa', 'Berlin'],
  },
  {
    question: 'Które z tych zwierząt są ssakami?',
    options: ['Pies', 'Krokodyl', 'Wieloryb', 'Orzeł'],
    correct: ['Pies', 'Wieloryb'],
  },
    {
    question: 'Które z tych planet są gazowymi olbrzymami?',
    options: ['Mars', 'Jowisz', 'Saturn', 'Ziemia'],
    correct: ['Jowisz', 'Saturn'],
  },
  {
    question: 'Wybierz owoce cytrusowe.',
    options: ['Banan', 'Pomarańcza', 'Jabłko', 'Cytryna', 'Grejpfrut'],
    correct: ['Pomarańcza', 'Cytryna', 'Grejpfrut'],
  },
  {
    question: 'Które z tych państw należą do Unii Europejskiej?',
    options: ['Polska', 'Szwajcaria', 'Niemcy', 'Norwegia'],
    correct: ['Polska', 'Niemcy'],
  },
];

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffledQuestions = useMemo(() => {
    if (!isStarted) return [];
    return questions.map(q => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  }, [questions, isStarted]);

  const handleStart = (num) => {
    const selected = shuffleArray(allQuestions).slice(0, num);
    setQuestions(selected);
    setAnswers(new Array(selected.length).fill(null));
    setIsStarted(true);
    setCurrentQuestion(0);
    setShowScore(false);
  };
  
  const handleAnswerToggle = (optionIndex) => {
    const newAnswers = [...answers];
    const currentAnswer = newAnswers[currentQuestion];
    
    const existingSelections = currentAnswer?.selected || [];
    const optionPosition = existingSelections.indexOf(optionIndex);

    let newSelections = [];
    if (optionPosition > -1) {
      newSelections = existingSelections.filter(item => item !== optionIndex);
    } else {
      newSelections = [...existingSelections, optionIndex];
    }
    
    newAnswers[currentQuestion] = {
      question: shuffledQuestions[currentQuestion].question,
      options: shuffledQuestions[currentQuestion].options,
      correct: shuffledQuestions[currentQuestion].correct,
      selected: newSelections.sort((a, b) => a - b), 
    };
    
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };
  
  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index);
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      if (!answer || !answer.selected) return score;

      const question = shuffledQuestions[index];
      const correctAnswersAsStrings = question.correct; 
      
      const selectedAnswersAsStrings = answer.selected.map(i => question.options[i]);
      
      const sortedCorrect = [...correctAnswersAsStrings].sort();
      const sortedSelected = [...selectedAnswersAsStrings].sort();

      if (JSON.stringify(sortedCorrect) === JSON.stringify(sortedSelected)) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const handleFinish = () => {
    setShowScore(true);
  };
  
  const handleRestart = () => {
    setIsStarted(false);
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
    setShowScore(false);
  };

  if (!isStarted) {
    return (
      <div className="start-screen">
        <h1>Witaj w Quizie!</h1>
        <p>Wybierz liczbę pytań, aby rozpocząć.</p>
        <div className="start-options">
          {[5, 7].map(num => (
            <button key={num} onClick={() => handleStart(num)}>
              {num} pytań
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showScore) {
    const finalScore = calculateScore();
    return (
      <div className="score-section">
        <h2>Quiz zakończony!</h2>
        <p>Twój wynik to {finalScore} na {questions.length} możliwych.</p>
        <button onClick={handleRestart}>Spróbuj ponownie</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="quiz-container">
        <div className="question-section">
          <div className="question-count">
            <span>Pytanie {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">{shuffledQuestions[currentQuestion].question}</div>
        </div>
        <div className="answer-section">
          {shuffledQuestions[currentQuestion].options.map((option, index) => {
            const isSelected = answers[currentQuestion]?.selected?.includes(index) ?? false;
            return (
              <label 
                key={index} 
                className={`checkbox-label ${isSelected ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAnswerToggle(index)}
                />
                {option}
              </label>
            );
          })}
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePrev} disabled={currentQuestion === 0}>
            Poprzednie
          </button>
          <button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
            Następne
          </button>
        </div>
        <button className="finish-button" onClick={handleFinish}>
          Zakończ Quiz
        </button>
      </div>

      <div className="question-grid">
        <h3>Pytania</h3>
        <div className="grid">
          {shuffledQuestions.map((_, index) => (
            <button
              key={index}
              className={`grid-item ${index === currentQuestion ? 'active' : ''} ${answers[index] ? 'answered' : ''}`}
              onClick={() => handleQuestionSelect(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
