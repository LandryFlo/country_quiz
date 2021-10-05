import './App.css';
import RootPage from './pages/rootpage';
import GameContext from './GameContext';
import {useState} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



function App() {
  const [startNewGame, setStartNewGame] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [tryAgain, setTryAgain] = useState(false);


  return (
    <div className="App">
       <GameContext.Provider value={{
        startNewGame, 
        numberOfQuestions,
        showResult,
        score,
        tryAgain,
        newGame: () => setStartNewGame(true),
        questionsNumber: (number) => setNumberOfQuestions(number),
        userResult: (score) => {
          setShowResult(!showResult); 
          setScore(score);
        },
        tryAnotherGame: () => setTryAgain(!tryAgain),
        initializeScore: () => setScore(0),
      }}>
        <RootPage />
      </GameContext.Provider>
    </div>
  );
}

export default App;
