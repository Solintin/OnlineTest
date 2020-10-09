import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import QuizSub from "../../Asset/QuizSub.PNG";


function QuizInstruction() {
  return (
    <>
      <Helmet>
        
        <title>Quiz Instructions - Quiz App</title>
      </Helmet>
      <div className="instructions">
        <center>
          <h4>
            
            <u> Test Instruction </u>
          </h4>
        </center>
        <p style={{ color: "red" }}>
          Carefully read through the test instructions below!!!
        </p>
        <ol>
          <li>
            Choose the test subject of your choice in the dropdown tab on the
            test page
          </li>
          <p>
            
            <img src={QuizSub} alt="Quiz Subject" />
          </p>
          <li>You are to carefully choose between the options of A to D <b style={{color : 'red'}}>once</b> for A particular question because the system recognizes first attempt, if you are not sure, move to the next question.</li>
          <li>Be mindful of your time bound, you will be notified when you are left with A minute. </li>
          <li>Your test result are being saved automatically, even if your time elapses without submitting, you are covered.</li>
          <li>You are free to submit whenever you are done.</li>
          <li>Your Perfomance are displayed instantly after a succesfull submission.</li>
        </ol>
        <div className=" linkContainer">
          <div className="link">
            <Link to="/">Back to home</Link>
          </div>

          <div className="link">
            <Link to="/play/quiz">Start Test</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizInstruction;
