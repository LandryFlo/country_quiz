import { useContext, useState, useRef, useCallback, useEffect } from "react";
import GameContext from "../../GameContext";
import Error from "../Error";
import Loading from "../Loading";
import image1 from "../../Images/questionImg.svg"


const QuestionCard = () => {

  console.log("i rendered");
  // Choices are just letter that begin the question, for better UX
  const choices = ["A", "B", "C", "D"];

  // game will be used to know if all the questions are displayed or not, and if it's time to show result component
  const game = useContext(GameContext);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  // Here we fetch Data from API and update the states above
  const fetchQuestion = async() => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=${game.numberOfQuestions}&category=22&difficulty=medium&type=multiple`);
      if(!response.ok){
        throw Error
      }
      const json = await response.json();
      setData(json.results);
    } 
    catch(error){
      setError(true);
    }
    setLoading(false);
  }

  // Our useEffect has an empty deps array because we want the data to be fetched once, 
  // there is no need for several fetch because our api already returns the questions 
  // in sufficient quantity according to the value of the amount variable passed in parameter of the url
  useEffect(() => {
    fetchQuestion();
  }, [])


  // answersNodes refers to the divs in which the answers offered to the user will be inserted. 
  const answersNodes = []

  // this callback function provide us a simple way to reference all the answers provide to users in the DOM
  const ref = useCallback(node => {
   if(node) answersNodes.push(node)
  })

  const nextButton = useRef(null);

  //initialize user score for current game
  const score = useRef(0);

  // Here we can find all the logic of the current game
  const handleResponseClick = (e) => {

    // when the user click on one answer we want the button next to be disabled if the result of the question is not yet displayed
    nextButton.current.style.pointerEvents = "none";
    const correctAnswer = data[currentQuestion].correct_answer;
    // useful for retrieving the correct answer from the dom and removing the associated letter
    const divOfCorrectAnswer = answersNodes.filter(node => node.textContent.split('').slice(1).join('') === correctAnswer)[0];
    const divOfUserAnswer =  e.currentTarget;
    const userAnswer = divOfUserAnswer.textContent.split('').slice(1).join(''); 

    divOfUserAnswer.style.backgroundColor = "#F9A826"
    divOfUserAnswer.classList.toggle("has-text-white");

    // Disables all other responses when clicking on a response
    answersNodes.map(node => node.style.pointerEvents = "none");

    // here we wait for 1.5 second before displaying the correct answer to the user
    setTimeout(() => {
      if (userAnswer === correctAnswer) {
        divOfUserAnswer.style.removeProperty("backgroundColor");
        divOfUserAnswer.classList.toggle('has-background-success');
        divOfUserAnswer.innerHTML += "<span class='material-icons'>check_circle</span>";

        // increment the user score with useRef
        score.current++;
      }
      else {
        divOfUserAnswer.style.removeProperty("backgroundColor");
        divOfUserAnswer.classList.toggle('has-background-danger');
        divOfUserAnswer.innerHTML += "<span class='material-icons'>highlight_off</span>";
        divOfCorrectAnswer.classList.toggle("has-background-success");
        divOfCorrectAnswer.innerHTML += "<span class='material-icons'>check_circle</span>";
        divOfCorrectAnswer.classList.toggle("has-text-white");

      };
      // we reactivate the button next 
      nextButton.current.style.pointerEvents = "auto";
    }, 1500)
    
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);

  // when the user click the next button, we check if all the questions are displayed or not, 
  //if they are, we update the Game context by passing him the user score
  const handleNextClick = () => {
    currentQuestion < data.length - 1 ? setCurrentQuestion(currentQuestion + 1) : game.userResult(score.current); 
  }

  // Depending on the loading, data, or error states we've declared above, we render the appropriate component
  return(
    <>
      { loading ? <Loading />
      :    
      error ? <Error />
      :
      <div className="is-flex is-flex-direction-column is-align-items-center">
        <div 
          className="box is-flex is-flex-direction-column is-justify-content-center"
          style={{
            maxWidth: "370px",
            background: "#FFFFFF",
            borderRadius: "24px",
          }}
        >
          <div className="is-flex is-align-items-center is-hidden-tablet-only" style={{position: "sticky"}}>
            <div className="questionImg">
              <img src={image1} alt="image" />
            </div>
          </div>              
          <p 
            className="is-size-6-mobile has-text-centered has-text-weight-bold mx-1 mb-5"
            style={{
              color:  "#2F527B",
            }}
          > 
          {/* Here we wait for the data we fetched in our useEffect before output the question */}
            {data && data[currentQuestion].question}
          </p>
          {/* same thing here, except that in addition we use destructuring to recover 
          the bad and good answers provided by the api.
          the sort method is also provided to display randomly, the answers to the user*/}
          { data &&
                [...data[currentQuestion].incorrect_answers, data[currentQuestion].correct_answer]
                .sort(() => Math.random() - 0.5)
                .map((answer, index) => (
              <div 
                className="box is-flex is-justify-content-space-between"
                key={answer}
                onClick={handleResponseClick}
                ref={ref}
                style={{
                  maxWidth: "400px",
                  left: "520px",
                  top: "388px",
                  background: "#FFF",
                  borderRadius: "12px",
                  color:  "#2F527B",
                  border:  "solid 1px", 
                  cursor: "pointer"            
                }}
                
              >
                <p className="is-size-7-mobile">
                  {/* choices stand for letters array we've declared line 12 */}
                  <span className="mr-3">{choices[index]}</span>                           
                  {answer}
                </p>
              </div>
            ))     
          }
          <div className="has-text-right" >
            <button 
              className="button"
              ref={nextButton}
              style={{
                background: "#F9A826",
                color: "#FFF",
                boxShadow: "0px 2px 4px rgba(252, 168, 47, 0.4)",
                borderRadius: "12px"
              }}
              onClick={handleNextClick}
            >
              {/* here use conditionnal rendering to display the correct text in the button 
              depending if we are at the end of the quiz or not */}
              {data && currentQuestion < data.length - 1 ? "Next" : "show results"}
            </button>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default QuestionCard;