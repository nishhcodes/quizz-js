import {questions} from './questionData.js'

let quizzScore = 0;
let attempted = 0;

function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * 74);
    return randomIndex;
}

const wrapper = document.querySelector('.wrapper');
const timerText = document.querySelector('.timer');

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
    
    // questions.splice(index, 1);
}


handleQuizzQuestions(getRandomQuestion());


let timer = 180; 
const countdown = setInterval(() => {
    timerText.textContent = `${timer}`;

    timer--;

    if (timer <= 10) {
        timerText.className = "text-red-500 font-bold";
    }

    if (timer < 0) {
        clearInterval(countdown); 
        wrapper.innerHTML = '';

        const score = document.createElement('p');
        score.className = "text-2xl text-gray-50 font-bold";
        score.textContent = `Your score is: ${quizzScore}`;
        wrapper.appendChild(score);

        const attempts = document.createElement('p');
        attempts.className = "text-2xl text-gray-50 font-bold";
        attempts.textContent = `Questions attempted: ${attempted}`;
        wrapper.appendChild(attempts);

        const accuracy = document.createElement('p');
        accuracy.className = "text-2xl text-gray-50 font-bold";
        accuracy.textContent = `Your accuracy is: ${((quizzScore / questions.length) * 100).toFixed(2)}%`;
        wrapper.appendChild(accuracy);

        wrapper.classList.add("flex", "justify-center", "items-center", "flex-col", "h-screen", "gap-4");
    }
}, 1000);

