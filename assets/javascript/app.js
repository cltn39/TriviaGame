
    //track timer
    var timeInSeconds = 60;
    const currentTime = Date.parse(new Date());
    const deadline = new Date(currentTime + timeInSeconds * 1000);
    //track what buttons do
    const startBtn = document.getElementById("start")
    const submitBtn = document.getElementById("submit");
    const nextBtn = document.getElementById("next");
    const previousBtn = document.getElementById("previous");
    //track where quizzes print 
    const quizContainer = document.getElementById("quiz");
    //track where results print
    const resultsContainer = document.getElementById("results");
    //track where timers print
    const timerContainer = document.getElementById("deadline")
    //track multiple quizzes
    const myQuestions = [
        { question: "Are you ready for some Trivia Quiz?",
          instruction: "Press Start button to start",
        },
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

    
    function getTimeRemaining(timeEnd) {
        let t = Date.parse(timeEnd) - Date.parse(new Date());
        console.log(t);
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
            previousBtn.style.display = "none";
            nextBtn.style.display = "none";
        } else {
            previousBtn.style.display = "none";
            nextBtn.style.display = "inline-block";
            startBtn.style.display ="none";
        }

        if (currentSlide === slides.length - 1) {
            nextBtn.style.display = "none";
            submitBtn.style.display = "inline-block";
        } else {
            submitBtn.style.display = "none";
        }
        console.log(currentSlide);
    }

    function buildQuiz() {
        // track where output go to
        const output = [];
        
        console.log(output);
        
        // for each question
        myQuestions.map(
            (currentQuestion, questionIndex) => {

                // building answers array
                const answers = [];

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

                // add question and answers to the output
                output.push(
                    `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
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
        myQuestions.map((currentQuestion, questionIndex) => {

            // find selected answer
            const answerContainer = answerContainers[questionIndex];
            const selector = 'input:checked';
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionIndex].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionIndex].style.color = 'red';
            }
        });
        //out of question variable
        let rightOutOf = myQuestions.length-1;
        let leftOutOf = numCorrect-1;
        // print correct answers out of all questions
        resultsContainer.innerHTML = leftOutOf + " out of " + rightOutOf;
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
        setTimeout(showNextSlide, 15000);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
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
    previousBtn.addEventListener("click", showPreviousSlide);
    nextBtn.addEventListener("click", showNextSlide);
    submitBtn.addEventListener("click", showResults);
    
    //display time remaining
    getTimeRemaining(deadline).seconds;

    console.log(getTimeRemaining(deadline).seconds);

    initTimer('timerdiv', deadline);

    setTimeout(showNextSlide, 15000);