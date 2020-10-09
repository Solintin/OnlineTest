import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "./Component/Home";
import Play from "./Component/Quiz/Play";
import QuizInstruction from "./Component/Quiz/QuizInstruction";
import QuizSummary from "./Component/Quiz/QuizSummary";
import ResultSummary from "./Component/Quiz/ResultSummary";

function App() {
  return (
    <>
     

      <Router>
      <div className="header-web">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div >
         <span> <Link to="/">About Us</Link></span>
          <Link to="/">Contact Us</Link>
        </div>
      </div>
        <Route exact path="/" component={Home} />
        <Route exact path="/play/instructions" component={QuizInstruction} />
        <Route exact path="/play/quiz" component={Play} />
        <Route exact path="/quiz-summary" component={QuizSummary} />
        <Route exact path="/quiz/result-overview" component={ResultSummary} />

       
      </Router>
    </>
  );
}

export default App;
