//track where quiz go 
var quizContainer = document.getElementById('quiz');
//track what result
var resultsContainer = document.getElementById('results');
//track what sumit button do
var submitBtn = document.getElementById('submit');
//track multiple questions
var myQuestions = [
    {
        question: "Question 1",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "a"
    },
    {
        question: "Question 2",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "b"
    },
    {
        question: "Question 3",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "c"
    },
    {
        question: "Question 4",
        answers: {
            a: "Answer 1",
            b: "Answer 2",
            c: "Answer 3",
            d: "Answer 4"
        },
        correctAnswer: "d"
    }
];
function buildQuiz() {
    // track where output go to
    var output = [];

    // for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // we'll want to store the list of answer choices
            var answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {

                // ...add an HTML radio button
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                     </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
<div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
}

function showResults() {

    // track all the answers
    var answerContainers = quizContainer.querySelectorAll(".answers");

    // track my answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

        // find selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = 'input:checked';
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // print correct answers out of all questions
    resultsContainer.innerHTML = numCorrect + " out of " + myQuestions.length;
}

//display quiz right away
buildQuiz();

//on submit, show results
submitBtn.addEventListener("click", showResults);
