import image2 from  "../../Images/resultImg.svg";

import { useContext } from "react";
import GameContext from "../../GameContext";

const ResultCard = () => {

  const game = useContext(GameContext);

  const handleNewGame = () => {
    game.tryAnotherGame();
    
  }
  return( 
    <div className="section">
      <div className="container">
        <div className="is-flex is-justify-content-center">
          <div 
            className="box is-flex is-flex-direction-column is-align-items-center is-justify-content-space-between"
            style={{
              maxWidth: "370px",
              maxHeight: "559px",
              left: "488px",
              top: "252px",
              background: "#FFFFFF",
              borderRadius: "24px",
            }}
          >
            <div className="results-img">
              <img src={image2} alt="image" />
            </div>           
            <div className="results-text has-text-centered">
              <p className="title my-5 has-text-weight-bold" style={{color: "#1D355D"}}>
                Results
              </p>
              <p className="is-size-7 my-5 has-text-weight-bold ">You got <span className="is-size-4 has-text-success">
                {game.score}</span> correct answers for {game.numberOfQuestions} questions
              </p>
            </div>        
            <div className=" result-button has-text-right" >
              <button 
                className="button is-link is-outlined"

                style={{
                  boxShadow: "0px 2px 4px rgba(252, 168, 47, 0.4)",
                  borderRadius: "12px"
                }}
                onClick={handleNewGame}
              >
                try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultCard; 