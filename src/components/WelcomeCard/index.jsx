import {useState, useContext} from 'react'; 
import GameContext from '../../GameContext';

const WelcomeCard = () => {


  const game = useContext(GameContext)
  const [defaultNumOfQuestions, setDefaultNumOfQuestions] = useState(5);

  const handleSubmit = (event) => {
    event.preventDefault();
    game.initializeScore();
    game.questionsNumber(defaultNumOfQuestions);
    if(game.tryAgain === false) {
      game.newGame();
    } else {
      game.tryAnotherGame();
      game.userResult();
      game.newGame();
    }    

  }
  return(
    <div className="is-flex is-flex-direction-column is-align-items-center">
      <div 
        className="welcome has-text-centered mb-3"
        style={{
          maxWidth: "60rem"
        }}
      >
        <p className="title is-size-4-mobile has-text-white is-size-3">
          Welcome to the country quiz ! 
        </p>
        <p className="has-text-white">
        Test your knowledge in geography by answering some questions 🗺️
        </p>
      </div>
      <div 
        className="box"
        style={{
          maxWidth: "370px",
          maxHeight: "559px",
          left: "488px",
          top: "252px",
          background: "#FFFFFF",
          borderRadius: "24px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label 
              className="has-text-centered has-text-weight-bold"
              style={{
                fontSize: 14,
                color:  "#2F527B",
              }}
            >
              How many questions would you like to start with ?
            </label>
            <div className="control"> 
              <div className="select">
                  <select onChange={(e) => setDefaultNumOfQuestions(e.target.value)}>
                  <option value="5" > 5 </option>
                  <option value="10"> 10 </option>
                  <option value="15"> 15 </option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control has-text-right">
              <button 
                className="button" 
                type="submit"
                style={{
                  background: "#F9A826",
                  color: "#FFF",
                  boxShadow: "0px 2px 4px rgba(252, 168, 47, 0.4)",
                  borderRadius: "12px"
                }}
              >
                Start 🚀
              </button>
            </div>
          </div>
        </form>
      </div>          
    </div>
    )
  }

export default WelcomeCard; 