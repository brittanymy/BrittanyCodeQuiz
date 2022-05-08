// HTML Element References
const quizQuestion = document.getElementById ('question'),
     timerEl = document.getElementById('timer'),
     quizAnswers = document.getElementById ('answers'),
     startBtn = document.getElementById ('start-btn'),
     inputInitials = document.getElementById ('initials'),
     submitBtn = document.getElementById ('submit-btn'),
     highScoreList = document.getElementById ('hs__list'),
     correctAnswer = document.getElementById ('correct'),
     wrongAnswer = document.getElementById ('wrong'),
     goBack = document.getElementById ('back-btn'),
     clearHighScores = document.getElementById ('clear-btn'),
     scoreTitle = document.getElementById('scoreTitle'),

     introScreen = document.getElementById ('intro'),
     questionContainer = document.getElementById ('question__container'),
     allDoneContainer = document.getElementById('all__done-container'),
     highScoreContainer = document.getElementById ('hs__container')


let qCounter = 0;
let timerCounter = 75;
let timerInterval;
let userSelectedAnswer = false;

let quizQuestions = [
    { 
        question: "If there is a mistake or problem in your program, there is a what?",
        answers: ["Debug", "Persist", "Bug", "Frustrate"],
        correctAnswer: "Bug",
    },
    {
        question: "What is the art of creating a program?",
        answers: ["1: Program", "2: Debugging", "3: Parameter", "4: Programming"],
        correctAnswer: "Programming",
    },
    {
        question: "What is trying again and again, even when something is hard?",
        answers: ["1: Persistence", "2: Program", "3: Code", "4: Command"],
        correctAnswer: "Persistence",
    },
    {
        question: "What is an Algorithm?",
        answers: ["1: Long division", "2: A series of instructions on how to accomplish a task", "3: A way to play the drums", "4: A way to write music on paper"],
        correctAnswer: "A series of instructions on how to accomplish a task",
    },
    {   
        question: "What can you make with programming?",
        answers: ["1: Websites", "2: Games", "3: Apps", "4: All of the above"],
        correctAnswer: "All of the above", 
    }
];
// Begin Quiz
startBtn.addEventListener ('click', startQuiz)

// Quiz Timer
function startTimer() {
    timerInterval = setInterval (function () {
        document.getElementById ('timer').innerHTML = timerCounter;
        timerCounter--;
        if (timerCounter <= 0) {
            clearInterval (interval)
            document.getElementById ('timer').innerHTML='0'
            finishQuiz();
        }
    }, 1000);
}

// Screen Switcher
function switchScreen(fromScreen, toScreen) {
    fromScreen.classList.add('hide');
    toScreen.classList.remove('hide');
}

function getNextQuestion() {
    // reset the answer feedback elements
    correctAnswer.classList.add('hide');
    wrongAnswer.classList.add('hide');

    // get the current question object (if it exists)
    const currentQuestion = quizQuestions[qCounter];

    // if next question doesn't exist, then return out
    if (!currentQuestion) return;

    // otherwise, update question title and return the next question object
    quizQuestion.textContent = currentQuestion.question;
    qCounter++;

    return currentQuestion;
}

function generateAnswerButtons(currentQuestion) {

    // get list of answer choices in the current question object
    const answerChoices = currentQuestion.answers;

    // start answer counter at 0th index, increase index by 1 every loop cycle
    // repeat process until answer counter is no longer less than the answer choices list
    // for (let answerIndex = 0; answerIndex < answerChoices.length; answerIndex++) {
    //     const answerChoice = answerChoices[answerIndex];

    // }

    // iterate over the answer choices list and generate the answer buttons
    answerChoices.forEach(answerChoice => {
        const btnEl = document.createElement('button');
        quizAnswers.appendChild(btnEl);
        btnEl.classList.add('btn');
        btnEl.textContent = answerChoice;
    });
}

function generateNextQuestion() {
    userSelectedAnswer = false;
    const currentQuestion = getNextQuestion();

    if (currentQuestion) {
       generateAnswerButtons(currentQuestion); 
    } else {
        finishQuiz();
    }
    
}

function startQuiz () {
    switchScreen(introScreen, questionContainer);
    startTimer();

    generateNextQuestion();
}

// handle logic when quiz is finished
function finishQuiz() {

    // stop timer
    clearInterval(timerInterval);

    // switch from questions screen to end of quiz screen
    switchScreen(questionContainer, allDoneContainer);

    // update score title
    scoreTitle.textContent = `All done! Your score is: ${timerCounter}`


}

function onAnswerChoiceClicked(event) {

    // if user has selected an answer, return out of the function
    if (userSelectedAnswer === true) {
        return;
    }

    // element that the user clicked on
    const elementClickedOn = event.target;

    // check to see if that element is an answer choice button
    if (elementClickedOn.classList[0] === 'btn') {

        // user has now selected an answer, this will prevent spam clicking
        userSelectedAnswer = true; // concept: debounce
       
        // if it is, get the text content of that button and compare it to the right answer
        const userAnswered = elementClickedOn.textContent;
        const currentQuestion = quizQuestions[qCounter - 1];

        if (userAnswered === currentQuestion.correctAnswer) {
            console.log('You got the answer right!')
            correctAnswer.classList.remove('hide');

        } else {
            console.log("You're wrong and you should feel bad")
            wrongAnswer.classList.remove('hide');
            timerCounter -= 10;
            timerEl.textContent = timerCounter;
        }

        setTimeout(function() {
            //quizAnswers.children.forEach(child => child.remove());
            // remove old answer choice buttons
            for (let index = quizAnswers.children.length - 1; index >= 0; index--) {
                quizAnswers.children[index].remove();
            }

            // generate next question
            generateNextQuestion();
        }, 2000)


    }
}

function onScoreSubmit() {

    const userInitials = inputInitials.value;
    console.log(userInitials);

}

submitBtn.addEventListener('click', onScoreSubmit)
quizAnswers.addEventListener('click', onAnswerChoiceClicked)








// Score page 

// VHS local storage name of local storage 
// high-low scores 
// clear hs


// reduce time