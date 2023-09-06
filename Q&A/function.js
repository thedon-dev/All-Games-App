const questions = [
    {
        question: "What month was Victor Jack born in?",
        answers: [
            {text: "October", status: "wrong"},
            {text: "July", status: "wrong"},
            {text: "September", status: "correct"},
            {text: "November", status: "wrong"}
        ]
    },
    {
        question: "Full meaning of COD?",
        answers: [
            {text: "Code Of Dune", status: "wrong"},
            {text: "Creed On Dirt", status: "wrong"},
            {text: "Call On Duty", status: "wrong"},
            {text: "Call Of Duty", status: "correct"}
        ]
    },
    {
        question: "who is the CEO of Microsoft?",
        answers: [
            {text: "Tim Cook", status: "wrong"},
            {text: "Satya Nadella", status: "correct"},
            {text: "Bill Gates", status: "wrong"},
            {text: "Mark Zuckerberg", status: "wrong"}
        ]
    },
    {
        question: "What year was the iPhone first released?",
        answers: [
            {text: "2006", status: "wrong"},
            {text: "2007", status: "correct"},
            {text: "2008", status: "wrong"},
            {text: "2009", status: "wrong"}
        ]
    },
    {
        question: "What is the name of Instagram's parent company? ",
        answers: [
            {text: "Vision", status: "wrong"},
            {text: "Facebook", status: "wrong"},
            {text: "Meta", status: "correct"},
            {text: "Web3", status: "wrong"}
        ]
    },
    {
        question: "Who is the most followed person on Instagram?",
        answers: [
            {text: "Cristiano Ronaldo", status: "correct"},
            {text: "Ariana Grande", status: "wrong"},
            {text: "Beyonce", status: "wrong"},
            {text: "Kanye West", status: "wrong"}
        ]
    },
    {
        question: "Which club does Pep Guardiola coach?",
        answers: [
            {text: "Liecester City", status: "wrong"},
            {text: "Manchester United", status: "wrong"},
            {text: "Newcastle", status: "wrong"},
            {text: "Manchester City", status: "correct"}
        ]
    },
]

const question = document.querySelector(".question");
const answerButtons = document.querySelector(".answerButtons");
const nextButton = document.querySelector(".nextButton");
const remark = document.querySelector(".remark");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetQuestions()

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    question.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);
        if(answer.status) {
            button.dataset.status = answer.status;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetQuestions() {
    nextButton.style.display = "none";
    remark.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons .firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.status === "correct";
    if(isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.status === "correct") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetQuestions();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    if (score <= 3) {
        remark.innerHTML = "You be olodo oo!";
        remark.style.display = "block";
    } else if(score > 3 && score < 6) {
        remark.innerHTML = "You tried";
        remark.style.display = "block";
    } else {
        remark.innerHTML = "Your brain get oil!";
        remark.style.display = "block";
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextQuestion();
    }else {
        startQuiz();
    }
})

startQuiz();