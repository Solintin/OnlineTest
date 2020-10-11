import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Questions from "../../Questions.json";
import Putme from "../../Putme.json";
import English from "../../English.json";
import Mathematics from "../../Mathematics.json";
import isEmpty from "../../Utils/isEmpty";
import mouseClick from "../../Asset/mouseClick.mp3";
import winSound from "../../Asset/winSound.mp3";
import wrongSound from "../../Asset/wrongSound.mp3";
import classnames from "classnames";
import { Grid } from "@material-ui/core";
import { mdiChevronDoubleLeft } from "@mdi/js";
import { mdiChevronDoubleRight } from "@mdi/js";
import Icon from "@mdi/react";

export default class Play extends Component {
  constructor(prop) {
    super();
    this.state = {
      selectedQuestion: [],
      question: Questions,
      putme: Putme,
      filteredAnswers: [],
      randomQuestions: [],
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestion: 0,
      numberOfAnsweredQuestion: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      nextBtnDis: false,
      prevBtnDis: true,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      time: {},
      prevRandNum: [],
      clickedRightAnswers: [],
      clickedWrongAnswers: "",
    };
    this.interval = null;
  }
  componentDidMount() {
    const {
      randomQuestions,
      currentQuestion,
      nextQuestion,
      previousQuestion,
    } = this.state;
    this.displayQuestions(
      randomQuestions,
      currentQuestion,
      previousQuestion,
      nextQuestion
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSelect = (e) => {
    const value = e.target.value;
    this.setState(
      {
        selectOpt: value,
      },
      () => {
        this.chooseRandQuestion(this.checkOpt().subject);

        this.startTimer(180000);
        this.setState(
          {
            currentQuestionIndex: 0,
          },
          () =>
            this.displayQuestions(
              this.state.randomQuestions,
              this.state.currentQuestion,
              this.state.previousQuestion,
              this.state.nextQuestion
            )
        );
      }
    );
  };

  checkOpt = () => {
    if (this.state.selectOpt === "English") {
      return {
        subject: English,
        duration: 120000,
      };
    } else if (this.state.selectOpt === "General Knowledge") {
      return {
        subject: Questions,
        duration: 180000,
      };
    } else {
      return {
        subject: Mathematics,
        duration: 240000,
      };
    }
  };

  chooseRandQuestion = (data) => {
    let arrayContainer = [];
    const genNum = Math.floor(Math.random() * 15);
    arrayContainer.push(genNum);
    this.setState((prevState) => {
      return {
        randomQuestions: [...prevState.randomQuestions, data[genNum]],
      };
    });
    for (let counter = 0; counter < 14; counter++) {
      let newGen = Math.floor(Math.random() * data.length);
      while (arrayContainer.lastIndexOf(newGen) !== -1) {
        newGen = Math.floor(Math.random() * data.length);
      }
      arrayContainer.push(newGen);
      this.setState((prevState) => {
        return {
          randomQuestions: [...prevState.randomQuestions, data[newGen]],
        };
      });
    }
  };

  displayQuestions = (
    randomQuestions,
    currentQuestion,
    previousQuestion,
    nextQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.randomQuestions)) {
      randomQuestions = this.state.randomQuestions;
      currentQuestion = randomQuestions[currentQuestionIndex];
      nextQuestion = randomQuestions[currentQuestionIndex + 1];
      previousQuestion = randomQuestions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          answer,
          numberOfQuestion: randomQuestions.length,
          prevRandNum: [],
        },
        () => {
          this.showOpton();
          this.handleDisableButton();
        }
      );
    }
  };

  handleOptionClick = (e) => {
    const {
      answer,
      selectedQuestion,
      clickedRightAnswers,
      currentQuestion,
    } = this.state;

    if (e.target.innerHTML.toLowerCase() === answer.toLowerCase()) {
      this.correctAnswers();

      const clickedRA = this.state.randomQuestions.filter((item) =>
        item.answer.toLowerCase().includes(e.target.innerHTML.toLowerCase())
      );
      if (!clickedRightAnswers.includes(currentQuestion)) {
        this.setState({
          clickedRightAnswers: [
            ...this.state.clickedRightAnswers,
            clickedRA[0],
          ],
        });
      }
    } else {
      this.wrongAnswers();
    }
    const clickedOpt = currentQuestion;
    if (!selectedQuestion.includes(clickedOpt)) {
      this.setState({
        selectedQuestion: [...selectedQuestion, clickedOpt],
      });
    }
  };
  correctAnswers = () => {
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.setState({
            currentQuestionIndex: this.state.randomQuestions.length - 1,
          });
        } else {
          this.displayQuestions(
            this.state.randomQuestions,
            this.state.currentQuestion,
            this.state.previousQuestion,
            this.state.nextQuestion
          );
        }
      }
    );
  };

  wrongAnswers = () => {
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.setState({
            currentQuestionIndex: this.state.randomQuestions.length - 1,
          });
        } else {
          this.displayQuestions(
            this.state.randomQuestions,
            this.state.currentQuestion,
            this.state.previousQuestion,
            this.state.nextQuestion
          );
        }
      }
    );
  };
  handleButtonClick = () => {
    this.buttonClick();
  };
  buttonClick = () => {
    document.getElementById("mouseClick").play();
  };
  handleNextClick = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevstate) => ({
          currentQuestionIndex: prevstate.currentQuestionIndex + 1,
        }),
        () =>
          this.displayQuestions(
            this.state.randomQuestions,
            this.state.currentQuestion,
            this.state.previousQuestion,
            this.state.nextQuestion
          )
      );
    }
  };
  handlePrevClick = () => {
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevstate) => ({
          currentQuestionIndex: prevstate.currentQuestionIndex - 1,
        }),
        () =>
          this.displayQuestions(
            this.state.randomQuestions,
            this.state.currentQuestion,
            this.state.previousQuestion,
            this.state.nextQuestion
          )
      );
    }
  };
  handleQuit = () => {
    if (window.confirm("Are you sure you want to quit")) {
      this.props.history.push("/");
    }
  };

  handleSubmit = () => {
    if (
      window.confirm(`Are you sure you want to submit, You've answered 
    ${this.state.selectedQuestion.length} out of
     ${this.state.randomQuestions.length} Questions`)
    ) {
      this.endGame();
    }
  };

  showOpton = () => {
    const options = Array.from(document.querySelectorAll(".options"));
    options.forEach((option) => {
      option.style.visibility = "visible";
    });
    this.setState({
      usedFiftyFifty: false,
    });
  };

  handleHint = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".options"));
      let indexAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexAnswer = index;
        }
      });
      while (true) {
        const randNum = Math.round(Math.random() * options.length);
        if (
          randNum !== indexAnswer &&
          !this.state.prevRandNum.includes(randNum)
        ) {
          options.forEach((option, index) => {
            if (index === randNum) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                prevRandNum: [...prevState.prevRandNum, randNum],
              }));
            }
          });
          break;
        }
        if (this.state.prevRandNum.length >= 3) break;
      }
    }
  };
  handleFiftyFifty = () => {
    const { fiftyFifty, usedFiftyFifty, answer } = this.state;
    if (fiftyFifty > 0 && usedFiftyFifty === false) {
      const options = document.querySelectorAll(".options");
      const randNumber = [];
      let indexofAnswer;

      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === answer.toLowerCase()) {
          indexofAnswer = index;
        }
      });
      let count = 0;
      do {
        const randNum = Math.round(Math.random() * 3);
        if (randNum !== indexofAnswer) {
          if (
            randNumber.length < 2 &&
            !randNumber.includes(randNum) &&
            !randNumber.includes(indexofAnswer)
          ) {
            randNumber.push(randNum);
            count++;
          } else {
            while (true) {
              const newRandNum = Math.round(Math.random() * 3);
              if (
                !randNumber.includes(newRandNum) &&
                !randNumber.includes(indexofAnswer)
              ) {
                randNumber.push(newRandNum);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randNumber.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
      }));
    }
  };

  startTimer = (duration) => {
    const countDownTime = Date.now() + duration;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;
      console.log(distance);
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            alert("Quiz has ended");
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestion === 0
    ) {
      this.setState({
        prevBtnDis: true,
      });
    } else {
      this.setState({
        prevBtnDis: false,
      });
    }
    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestion + 1 === this.state.numberOfQuestion
    ) {
      this.setState({
        nextBtnDis: true,
      });
    } else {
      this.setState({
        nextBtnDis: false,
      });
    }
  };

  endGame = () => {
    alert("Quiz has Ended");
    const {
      score,
      numberOfQuestion,
      numberOfAnsweredQuestion,
      correctAnswers,
      wrongAnswers,
      fiftyFifty,
      hints,
      clickedRightAnswers,
      randomQuestions,
    } = this.state;
    const playerStats = {
      Score: score,
      TotalQuestions: numberOfQuestion,
      numberOfAnsweredQuestion,
      correctAnswers,
      wrongAnswers,
      fiftyFiftyUsed: 2 - fiftyFifty,
      hintsUsed: 5 - hints,
      clickedRightAnswers,
      randomQuestions,
    };

    setTimeout(() => {
      this.props.history.push("/quiz-summary", playerStats);
    }, 1000);
  };

  if() {}

  setIndex = (idx, items) => {
    const checkStatus = this.state.selectedQuestion.includes(items);

    if (checkStatus) {
      return "green";
     }
  
  }; 
  setIndexNotAnswered = (items) =>{
    const checkStatus = this.state.selectedQuestion.includes(items);

    if (!checkStatus) {
      return "red";
     }
  }

  setIndexCurrent = (idx) => {
    if (this.state.currentQuestionIndex === idx ) {
      return "blue"
    }
  }

  indexClick = (idx) => {
    this.setState(
      {
        currentQuestionIndex: idx,
      },
      () =>
        this.displayQuestions(
          this.state.randomQuestions,
          this.state.currentQuestion,
          this.state.previousQuestion,
          this.state.nextQuestion
        )
    );
  };

  render() {
    const { currentQuestion, time } = this.state;

    return (
      <>
        <Helmet>
          <title> Quiz Page</title>
        </Helmet>
        <>
          <audio id="winSound" src={winSound}></audio>
          <audio id="wrongSound" src={wrongSound}></audio>
          <audio id="mouseClick" src={mouseClick}></audio>
        </>
        <div className="questions">
          <select onChange={this.handleSelect}>
            <option>-- Subject--</option>
            <option value="General Knowledge"> General Knowledge</option>
            <option value="English">English</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h4>
                {this.state.currentQuestionIndex + 1} of {``}
                {this.state.numberOfQuestion}
              </h4>
            </Grid>

            <Grid item xs={6}>
              <span style={{ float: "right" }}>
                <h4 style={{ color: time.minutes < 1 ? "red" : "" }}>
                  {time.minutes} : {time.seconds}
                  <span className="mdi mdi-clock-outline mdi-36px lifeline-icon"></span>
                </h4>
              </span>
            </Grid>
          </Grid>

          <center>
            {" "}
            <h4>{currentQuestion.question}</h4>
          </center>

          <Grid container justify="center">
            <Grid item container xs={10}>
              <Grid item xs={12} md={6}>
                <div onClick={this.handleOptionClick} className="options">
                  {currentQuestion.optionA}
                </div>
                <div onClick={this.handleOptionClick} className="options">
                  {currentQuestion.optionB}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div onClick={this.handleOptionClick} className="options">
                  {currentQuestion.optionC}
                </div>
                <div onClick={this.handleOptionClick} className="options">
                  {currentQuestion.optionD}
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className="button-container" justify="center">
            <Grid item container xs={10}>
              <Grid item xs={6} md={3}>
                <button
                  className={classnames("", { disable: this.state.prevBtnDis })}
                  onClick={() => {
                    this.handleButtonClick();
                    this.handlePrevClick();
                  }}
                >
                  {" "}
                  <Icon
                    path={mdiChevronDoubleLeft}
                    className="doubleleft-icon"
                  />
                  Previous
                </button>
              </Grid>
              <Grid item xs={6} md={3}>
                <button
                  className={classnames("", { disable: this.state.nextBtnDis })}
                  onClick={() => {
                    this.handleButtonClick();
                    this.handleNextClick();
                  }}
                >
                  Next
                  <Icon
                    path={mdiChevronDoubleRight}
                    className="doubleleft-icon"
                  />
                </button>
              </Grid>
              <Grid item xs={6} md={3}>
                <button
                  style={{ backgroundColor: "brown" }}
                  onClick={() => {
                    this.handleButtonClick();
                    this.handleQuit();
                  }}
                >
                  Quit
                </button>
              </Grid>
              <Grid item xs={6} md={3}>
                <button
                  style={{ backgroundColor: "green" }}
                  onClick={() => {
                    this.handleSubmit();
                  }}
                >
                  Submit
                </button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      { this.state.randomQuestions.length > 0 ?  
          <div className="question-index">
          {this.state.randomQuestions.map((items, idx) => (
            <div
              onClick={() => this.indexClick(idx)}
              className="indexes"
              style={{
                cursor: "pointer",
                color : 'white',
                backgroundColor: this.setIndex(idx + 1, items) || this.setIndexCurrent(idx) || this.setIndexNotAnswered(items) ,
              }}
            >
              {idx + 1}
            </div>
          ))}
        </div>
        : null
       }
      </>
    );
  }
}
