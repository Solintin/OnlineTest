import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { mdiCheckCircleOutline } from "@mdi/js";
import { mdiCheckBold } from "@mdi/js";
import { mdiArrowLeftBold } from "@mdi/js";
import { mdiReplay } from "@mdi/js";
import { mdiCloseThick } from "@mdi/js";
import { mdiChartBar } from "@mdi/js";
import { mdiChartLine } from "@mdi/js";
import Icon from "@mdi/react";

export default class QuizSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestion: 0,
      numberOfAnsweredQuestion: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      usedFiftyFifty: 0,
      usedHints: 0,
      filteredRightAnswers: [],
      filteredWrongAnswers: [],
    };
  }
  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      this.setState(
        {
          filteredRightAnswers: state.clickedRightAnswers.filter(
            (v, i, a) => a.findIndex((t) => t.question === v.question) === i
          ),
          filteredWrongAnswers: state.randomQuestions.filter(
            (item) =>
              !state.clickedRightAnswers
                .filter(
                  (v, i, a) =>
                    a.findIndex((t) => t.question === v.question) === i
                )
                .includes(item)
          ),
        },
        () =>
          this.setState(
            {
              score:
                (this.state.filteredRightAnswers.length /
                  state.randomQuestions.length) *
                100,
              numberOfQuestion: state.randomQuestions.length,
              correctAnswers: this.state.filteredRightAnswers.length,
              wrongAnswers: this.state.filteredWrongAnswers.length,
            },
            () =>
              this.setState({
                numberOfAnsweredQuestion:
                  this.state.correctAnswers + this.state.wrongAnswers,
              })
          )
      );
    }
    console.log(this.state.filteredRightAnswers.length);
  }
  render() {
    const { state } = this.props.location;
    const { score, filteredRightAnswers, filteredWrongAnswers } = this.state;
    const result = {
        correctAns : filteredRightAnswers,
        wrongAns : filteredWrongAnswers,
        Questions : state.randomQuestions
    }
    let stats, remark;

    if (score === 0) {
      remark = <h3 style={{ color: "red" }}>Failed</h3>;
    } else if (score <= 30) {
      remark = <h3 style={{ color: "Yellow" }}>You Need More Practice</h3>;
    } else if (score > 30 && score <= 50) {
      remark = <h3 style={{ color: "blue" }}>BetterLuck Next time!</h3>;
    } else if (score <= 70 && score > 50) {
      remark = <h3 style={{ color: "yellowgreen" }}>You Can do Better</h3>;
    } else if (score >= 71 && score <= 84) {
      remark = <h3 style={{ color: "lightgreen" }}>You Did Great</h3>;
    } else {
      remark = <h3 style={{ color: "green" }}>You are absolutely a Genuis</h3>;
    }

    if (state !== undefined) {
      stats = (
        <>
          <div className="upper-layer">
            <div>
              <Icon path={mdiCheckCircleOutline} className="success-icon" />
            </div>
            <div>
              <h2>Submit Sucessfull</h2>
            </div>
          </div>
          <div className="container container-summary">
            {remark}
            <h2 style={{ color: "cyan" }}>
              Your Score: {this.state.score.toFixed(0)}&#37;
            </h2>

            <span className="left">
              <Icon path={mdiChartBar} className=" total-icon" />
              <span className="stat">Total Number of Questions:</span>{" "}
            </span>
            <span className="right"> {this.state.numberOfQuestion} </span>
            <br />

            <span className="left ">
              <Icon path={mdiChartLine} className=" attempt-icon" />
              <span className="stat">Number of Attempted Questions:</span>{" "}
            </span>
            <span className="right">{this.state.numberOfAnsweredQuestion}</span>
            <br />

            <span className="left ">
              <Icon path={mdiCheckBold} className=" correct-icon" />
              <span className="stat">Number of Correct Answers</span>:{" "}
            </span>
            <span className="right"> {this.state.correctAnswers} </span>
            <br />
            {console.log(this.props)}

            <span className="left">
              <Icon path={mdiCloseThick} className="wrong-icon" />
              <span className="stat">Number of Wrong Answers:</span>
            </span>
            <span className="right"> {this.state.wrongAnswers} </span>
            <br />
          </div>
          <div className=" linkContainer">
            <div className="link">
              <Icon path={mdiArrowLeftBold} className="left-icon" />
              <Link to="/">Back to home</Link>
            </div>
            <div className="link">
              <Link to={{pathname: "/quiz/result-overview", state: {result} }}> Result Summary </Link>
            </div>

            <div className="link">
              <Icon path={mdiReplay} className="replay-icon" />
              <Link to="/play/quiz">Take Test Again</Link>
            </div>
          </div>
        </>
      );
    } else {
      stats = (
        <>
        <center style={{color : 'red'}}> <h2>No Result Available, Please navigate to homepage and take test</h2> </center>
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
        </>
      );
    }
    return (
      <>
        <Helmet>
          <title>Quiz App - Summary </title>
        </Helmet>
        <div className="cont">{stats}</div>
      </>
    );
  }
}
