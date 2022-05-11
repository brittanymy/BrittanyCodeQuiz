// HTML Element References
const quizQuestion = document.getElementById ('question'),
     timerEl = document.getElementById('timer'),
     quizAnswers = document.getElementById ('answers'),
     startBtn = document.getElementById ('start-btn'),
     inputInitials = document.getElementById ('initials'),
     submitBtn = document.getElementById ('submit-btn'),
     highScoreList = document.getElementById ('hs-list'),
     viewHighScores = document.getElementById ('vhs'),
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

// Quiz!
let quizQuestions = [
    { 
        question: "If there is a mistake or problem in your program, there is a what?",
        answers: ["Debug", "Persist", "Bug", "Frustrate"],
        correctAnswer: "Bug",
    },
    {
        question: "What is the art of creating a program?",
        answers: ["Program", "Debugging", "Parameter", "Programming"],
        correctAnswer: "Programming",
    },
    {
        question: "What is trying again and again, even when something is hard?",
        answers: ["Persistence", "Program", "Code", "Command"],
        correctAnswer: "Persistence",
    },
    {
        question: "What is an Algorithm?",
        answers: ["Long division", "A series of instructions on how to accomplish a task", "A way to play the drums", "A way to write music on paper"],
        correctAnswer: "A series of instructions on how to accomplish a task",
    },
    {   
        question: "What can you make with programming?",
        answers: ["Websites", "Games", "Apps", "All of the above"],
        correctAnswer: "All of the above", 
    }
];
// Begin Quiz Button
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

// Calls Quiz Question
function getNextQuestion() {
    // Resets correct/wrong answer feedback
    correctAnswer.classList.add('hide');
    wrongAnswer.classList.add('hide');

    // Get the current question object (if it exists)
    const currentQuestion = quizQuestions[qCounter];

    // If next question doesn't exist, then return out
    if (!currentQuestion) return;

    // Otherwise, update question title and return the next question object
    quizQuestion.textContent = currentQuestion.question;
    qCounter++;

    return currentQuestion;
}

// Generate Answer Buttons
function generateAnswerButtons(currentQuestion) {

    // Get list of answer choices in the current question object
    const answerChoices = currentQuestion.answers;

    // Iterate over the answer choices list and generate the answer buttons
    answerChoices.forEach(answerChoice => {
        const btnEl = document.createElement('button');
        quizAnswers.appendChild(btnEl);
        btnEl.classList.add('btn');
        btnEl.textContent = answerChoice;
    });
}

// Continuation of quiz
function generateNextQuestion() {
    userSelectedAnswer = false;
    const currentQuestion = getNextQuestion();

    if (currentQuestion) {
       generateAnswerButtons(currentQuestion); 
    } else {
        finishQuiz();
    } 
}

// When user starts quiz, questions are presented
function startQuiz () {
    switchScreen(introScreen, questionContainer);
    startTimer();

    generateNextQuestion();
}

// Quiz Completion Logic
function finishQuiz() {

    // Stop timer
    clearInterval(timerInterval);

    // Switch from questions screen to end of quiz screen
    switchScreen(questionContainer, allDoneContainer);

    // Update score title
    scoreTitle.textContent = `All done! Your score is: ${timerCounter}`
}

// Allows user to select an answer and receive feedback
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
        }, 1000)
    }
}

// Submits user score -> enter initials screens
function onScoreSubmit(event) {
    event.preventDefault()
    const userInitials = inputInitials.value;

    let userScore = JSON.parse(localStorage.getItem("codeQuiz")) ||[]
    userScore.push({user: userInitials, score: timerCounter})

    localStorage.setItem ('codeQuiz', JSON.stringify(userScore))

    switchScreen(allDoneContainer, highScoreContainer);
    displayHighScores();
}

// Initials presented on hs screen
function displayHighScores() {
 
    let userScore = JSON.parse(localStorage.getItem("codeQuiz")) ||[]
    for (let i = 0; i < userScore.length; i++) {
        for(let j=0; j <userScore.length; j++) {
         if(userScore[i].score > userScore[j].score){
             let temp = userScore[j]
             userScore[j] = userScore[i]
             userScore[i] = temp
         }
        }
    }
    for (let i = 0; i < userScore.length; i++)  {
        let li = document.createElement('li')
        let text = document.createTextNode(`${userScore[i].user} - ${userScore[i].score}`)
        li.appendChild(text)
        highScoreList.appendChild(li)
    }

}

// Clear hs
function clearScoresBtn () {
    console.log("CLEAR")
    localStorage.removeItem ('codeQuiz')
    highScoreList.innerHTML = '';
} 

// Go back 
function goBackBtn () {
    location.reload ();
}

// Final Event Listeners 
quizAnswers.addEventListener('click', onAnswerChoiceClicked)
submitBtn.addEventListener('click', onScoreSubmit)
clearHighScores.addEventListener('click', clearScoresBtn)
viewHighScores.addEventListener('click', displayHighScores)
console.log(viewHighScores, 'ok');
goBack.addEventListener('click', goBackBtn)