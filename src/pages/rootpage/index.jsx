import WelcomeCard from "../../components/WelcomeCard"
import QuestionCard from "../../components/QuestionCard"
import ResultCard from "../../components/ResultCard"
import GameContext from "../../GameContext"
import { useContext } from "react"


const RootPage = () => {
 
  const game = useContext(GameContext); 
  

  const renderComponent = () => {
    if(game.startNewGame === false || game.tryAgain === true) {
      return <WelcomeCard /> 
    }
    else if ( game.startNewGame === true && game.showResult === true) {
      return <ResultCard /> 
    }
    else {
      return <QuestionCard/>
    }
  }

  return (
    <div 
      className="section rootpage" 
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/background.png)",
        backgroundSize: "cover"
      }}
    >
      <div className="container">
        {
          renderComponent()
        }
      </div>
    </div>
  )
}

export default RootPage;