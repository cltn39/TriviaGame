const myQuestions = [
    {
        question: "Are you ready for some Trivia Quiz?",
        hint: "Press Start button to start",
        timeLeft: 1
    },
    {
        question: "Question 1",
        hint: "answer is a",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "a",
        timeLeft: 63
    },
    {
        question: "Question 2",
        hint: "answer is b",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "b",
        timeLeft: 47
    },
    {
        question: "Question 3",
        hint: "answer is c",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "c",
        timeLeft: 31
    },
    {
        question: "Question 4",
        hint: "answer is d",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "d",
        timeLeft: 15
    },
    {}
];
//track what buttons do
const startBtn = document.getElementById("start")
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");
const hintBtn = document.getElementById("hint");
//track where quizzes print 
const quizContainer = document.getElementById("quiz");
//track where results print
const resultsContainer = document.getElementById("results");
//track where timers print
const timerContainer = document.getElementById("deadline")
//track where instruction print
const instructionContainer = document.getElementById("deadline")
//track multiple quizzes


function getTimeRemaining(timeEnd) {
    let t = Date.parse(timeEnd) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000));
    return {
        "total": t,
        "seconds": seconds
    };
}
function initTimer(id, timeEnd) {
    const clock = document.getElementById(id);
    const secondsSpan = clock.querySelector('.seconds');
    function updateTimer() {
        let t = getTimeRemaining(timeEnd);


        secondsSpan.innerHTML = t.seconds;
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateTimer(); // run function once at first to avoid delay
    const timeinterval = setInterval(updateTimer, 1000);
}

function showSlide(n) {
    // hide the current slide by removing the active-slide class
    slides[currentSlide].classList.remove("active-slide");
    // show the new slide by adding the active-slide class
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
        hintBtn.style.display = "none";
        nextBtn.style.display = "none";
    } else {
        hintBtn.style.display = "inline-block";
        nextBtn.style.display = "none";
        startBtn.style.display = "none";
    }

    if (currentSlide === slides.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        submitBtn.style.display = "none";
    }
}

function buildQuiz() {
    // track where output go to
    const output = [];

    // for each question
    myQuestions.forEach(
        (currentQuestion, questionIndex) => {
            console.log(currentQuestion);
            console.log(questionIndex);
            // building answers array
            const answers = [];
            //buidling hint section
            const hint = [];
            // build each questions
            for (letter in currentQuestion.answers) {

                // add radio button
                answers.push(
                    `
                        <label>
                        <input type="radio" name="question${questionIndex}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                         </label>`
                );
            }
            // add hint section
            hint.push(
                `<p>${currentQuestion.hint}</p>`
            )
            // add question and answers to the output
            output.push(
                `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="hint" hidden> ${currentQuestion.hint} </div>
                <br>
                <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
            // add each timer
        }
    );

    //combine into a string
    quizContainer.innerHTML = output.join("");
}

function showResults() {

    // track all the answers
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // track my answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionIndex) => {

        // find selected answer
        const answerContainer = answerContainers[questionIndex];
        console.log(answerContainer);
        const selector = "input:checked";
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionIndex].style.color = "lightgreen";
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[questionIndex].style.color = "red";
        }
    });
    //out of question variable
    let rightOutOf = myQuestions.length - 1;
    let leftOutOf = numCorrect - 1;
    // print correct answers out of all questions
    resultsContainer.innerHTML = leftOutOf + " out of " + rightOutOf;
    // show all the past quizzes
    const quizFormat = document.getElementsByClassName("slide")
    console.log(quizFormat[1]);
    for (i=0; i<quizFormat.length; i++) {
        quizFormat[i].style.position = "relative"
        quizFormat[i].style.opacity = "1"

    };
}

function showNextSlide() {
    //track timer
    let timeInSeconds = 15;
    const currentTime = Date.parse(new Date());
    const deadline = new Date(currentTime + timeInSeconds * 1000);
    showSlide(currentSlide + 1);
    if (currentSlide === myQuestions.length -1) {
        showResults();
    } else {
        setTimeout(showNextSlide, 15000);
        getTimeRemaining(deadline).seconds;
        console.log(getTimeRemaining(deadline).seconds);
        initTimer("timerdiv", deadline);
    };
}

function showHint() {
    var myHint = document.getElementsByClassName("hint");
    for (i = 0; i < myHint.length; i++) {
        if (myHint[i].hidden === true) {
            myHint[i].hidden = false;
        } else {
            myHint[i].hidden = true;
        }
    }
}
//display quiz right away
buildQuiz();

//track slides
const slides = document.querySelectorAll(".slide");
//track initial slides
let currentSlide = 0;

//display first slide
showSlide(0);

//button event on click
startBtn.addEventListener("click", showNextSlide);
hintBtn.addEventListener("click", showHint);
nextBtn.addEventListener("click", showNextSlide);
submitBtn.addEventListener("click", showResults);
submitBtn.addEventListener("click", showNextSlide);