import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { mdiArrowLeftBold } from "@mdi/js";
import { mdiReplay } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";

export default class ResultSummary extends Component {
  render() {
    const {
      state: {
        result: { correctAns, wrongAns, Questions},
      },
    } = this.props.location;
    return (
      <>
        <Helmet>
          
          <title>Quiz - Result Summary</title>
        </Helmet>
        <div className="result-page">
          <div className="header">Result Summary</div>
          <div className="summary">
            <h4 style={{color : 'blue'}}>Correct Choice(s) ({correctAns.length})</h4>
            {correctAns.map((item) => (
              <>
                <p style={{ fontWeight: "bolder", marginBottom: "8px" }}>
                Q{Questions.indexOf(item) + 1}. {item.question} -
                  <span style={{ fontWeight: "bolder", color: "green" }}>
                    {item.answer}
                  </span>{console.log(Questions)}
                </p>
              </>
            ))}
            
            <h4 style={{color : 'red'}}>Wrong Choice(s) ({wrongAns.length})</h4>
            {wrongAns.map((item) => (
              <>
                <p style={{ fontWeight: "bolder", marginBottom: "8px" }}>
                Q{Questions.indexOf(item) + 1}. {item.question} -
                  <span style={{ fontWeight: "bolder", color: "green" }}>
                    {item.answer}
                  </span>
                </p>
              </>
            ))}
          </div>

          <div className=" linkContainer">
            <div className="link">
              <Icon path={mdiArrowLeftBold} className="left-icon" />
              <Link to="/">Back to home</Link>
            </div>

            <div className="link">
              <Icon path={mdiReplay} className="replay-icon" />
              <Link to="/play/quiz">Take Test Again</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
