// HTML Element References
const quizQuestion = document.getElementById ('question'),
     quizAnswers = document.getElementById ('answers'),
     startBtn = document.getElementById ('start-btn'),
     inputInitials = document.getElementById ('initials'),
     submitBtn = document.getElementById ('submit-btn'),
     highScoreList = document.getElementById ('hs__list'),
     correctAnswer = document.getElementById ('correct'),
     wrongAnswer = document.getElementById ('wrong'),
     goBack = document.getElementById ('back-btn'),
     clearHighScores = document.getElementById ('clear-btn'),

     introScreen = document.getElementById ('intro'),
     questionContainer = document.getElementById ('question__container')

let qCounter = 0; 
let timerCounter = 75;

// Begin Quiz
startBtn.addEventListener ('click', startQuiz)

// Responsible for starting the quiz timer routine
function startTimer() {
    const interval = setInterval (function () {
        document.getElementById ('timer').innerHTML = timerCounter;
        timerCounter--;
        if (timerCounter === 0) {
            clearInterval (interval)
            document.getElementById ('timer').innerHTML='0'
        }
    }, 1000);
}

// Responsible for switching between two container elements
function switchScreen(fromScreen, toScreen) {
    fromScreen.classList.add('hide');
    toScreen.classList.remove('hide');
}

function getNextQuestion() {
    const currentQuestion = quizQuestions[qCounter];
    quizQuestion.textContent = currentQuestion.question;
    qCounter++;

    return currentQuestion;
}


function generateAnswerButtons(currentQuestion) {

    const answerChoices = currentQuestion.answers;

    // start answer counter at 0th index, increase index by 1 every loop cycle
    // repeat process until answer counter is no longer less than the answer choices list
    // for (let answerIndex = 0; answerIndex < answerChoices.length; answerIndex++) {
    //     const answerChoice = answerChoices[answerIndex];

    // }

    answerChoices.forEach(answerChoice => {
        const btnEl = document.createElement('button');

    });


}


function startQuiz () {
    switchScreen(introScreen, questionContainer);
    startTimer();

    const currentQuestion = getNextQuestion();
    generateAnswerButtons(currentQuestion);

}

let quizQuestions = [
    { 
        question: "If there is a mistake or problem in your program, there is a what?",
        answers: ["1: Debug", "2: Persist", "3: Bug", "4: Frustrate"],
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
        answer: ["1: Long division", "2: A series of instructions on how to accomplish a task", "3: A way to play the drums", "4: A way to write music on paper"],
        correctAnswer: "A series of instructions on how to accomplish a task",
    },
    {   
        question: "What can you make with programming?",
        answer: ["1: Websites", "2: Games", "3: Apps", "4: All of the above"],
        correctAnswer: "All of the above", 
    }
];

// Show question wrong right
// loop answers inner html
// match index of answer to buttons  0-

// seconds between questions 

// Next question 

// Score page 

// VHS local storage name of local storage 
// high-low scores 
// clear hs


// reduce time