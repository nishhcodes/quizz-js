import {questions} from './questionData.js'

let quizzScore = 0;
let attempted = 0;

function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * 74);
    return randomIndex;
}

function handleQuizzQuestions(index) {

    const scoreText = document.querySelector('.score');
    const questionText = document.querySelector('.question-text');
    const topicText = document.querySelector('.topic');
    const answerText = document.querySelector('.answer-text');
    const attemptedText = document.querySelector('.attempted');
    

    answerText.innerHTML = '';


    questionText.innerHTML = questions[index].question;
    topicText.textContent = questions[index].topic;

    questions[index].answers.forEach(ans => {
        answerText.innerHTML += `<button class="answerBtn">${ans}</button>`;
    });

    let answers = document.querySelectorAll('button');
    answers.forEach(ans => {
        ans.className = 'text-2xl rounded-xl py-2 px-2 text-left border border-solid border-gray-400 font-bold'
        
        ans.addEventListener('click', (e) => {
           
            attempted++;
            attemptedText.textContent = attempted;

            if (e.target.textContent === questions[index].correctAnswer) {
                quizzScore++;
                scoreText.textContent = quizzScore;
            }

           handleQuizzQuestions(getRandomQuestion());
        })
    })
    
}

handleQuizzQuestions(getRandomQuestion());