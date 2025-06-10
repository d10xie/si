import { useState } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([
    {
      question: 'Które z poniższych są kolorami podstawowymi w modelu RGB?',
      answers: ['Czerwony', 'Zielony', 'Niebieski', 'Żółty'],
      correctAnswer: ['Czerwony', 'Zielony', 'Niebieski'],
    },
    {
      question: 'Wybierz wszystkie liczby parzyste.',
      answers: ['1', '2', '8', '11', '14'],
      correctAnswer: ['2', '8', '14'],
    },
    {
      question: 'Które z podanych języków są językami programowania?',
      answers: ['HTML', 'Java', 'CSS', 'Python'],
      correctAnswer: ['Java', 'Python'],
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerOptionClick = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];

    const answerIndex = newSelectedAnswers.indexOf(answer);

    if (answerIndex > -1) {
      newSelectedAnswers.splice(answerIndex, 1);
    } else {
      newSelectedAnswers.push(answer);
    }
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextButtonClick = () => {
    const correctAnswers = questions[currentQuestion].correctAnswer;

    const sortedUserAnswers = [...selectedAnswers].sort();
    const sortedCorrectAnswers = [...correctAnswers].sort();

    if (JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers)) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswers([]);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          Zdobyłeś {score} z {questions.length} punktów
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Pytanie {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answers.map((answer) => (
              <div key={answer} className='checkbox-option'>
                <input
                  type="checkbox"
                  id={answer}
                  value={answer}
                  checked={selectedAnswers.includes(answer)}
                  onChange={() => handleAnswerOptionClick(answer)}
                />
                <label htmlFor={answer}>{answer}</label>
              </div>
            ))}
          </div>
          <div className='next-button-section'>
            <button 
              onClick={handleNextButtonClick}
              disabled={selectedAnswers.length === 0} 
            >
              {currentQuestion + 1 === questions.length ? 'Pokaż wyniki' : 'Następne pytanie'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;