// const questions = document.querySelectorAll('section');
// let currentQuestion = 0;

//  const allButtons = document.querySelectorAll('.option button');
//  allButtons.forEach(button =>{
//     button.addEventListener('click', () => {
//         showNextQuestion();
//     });
//  });

//  function showNextQuestion() {
//     // hide current quection
//     questions[currentQuestion].classList.remove('shown')
//     questions[currentQuestion].classList.add('hidden')

//     // moving to the next question
//     currentQuestion++;

//     // if there are more questions, show next one
//     if (currentQuestion < questions.length) {
//         questions[currentQuestion].classList.remove('hidden');
//         questions[currentQuestion].classList.add('shown');
//     } else {
//         alert('Quiz completed!');
//     }
// }

// improve code with more attribute

const questions = document.querySelectorAll("section");
const correctAnswer = ["A", "B", "A", "C", "D", "C", "A", "B", "D", "C"];
let userAnswer = [];
let currentQuestion = 0;
// let currentQuestion = 0;

// Select all answer buttons
const allButtons = document.querySelectorAll(".option button");

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    highlightAnswer(e.target);
    setTimeout(showNextQuestion, 500); // Wait 0.5s before moving to next
    recordAnswer(button.id);
  });
});

function highlightAnswer(button) {
  // Remove highlight from all buttons in current question
  const currentButtons = questions[currentQuestion].querySelectorAll("button");
  currentButtons.forEach((btn) => btn.classList.remove("selected"));

  // Highlight the clicked button
  button.classList.add("selected");
}

function recordAnswer(answer) {
  userAnswer.push(answer.toUpperCase());
  console.log(userAnswer);
}

function showNextQuestion() {
  // Hide current question
  questions[currentQuestion].classList.remove("shown");
  questions[currentQuestion].classList.add("hidden");

  // Move to next question
  currentQuestion++;

  // If there are more questions, show next one
  if (currentQuestion < questions.length) {
    questions[currentQuestion].classList.remove("hidden");
    questions[currentQuestion].classList.add("shown");
  } else {
    showScore();
  }
}

function calculateScore(correctAnswer, userAnswer) {
  let score = 0;
  for (let i = 0; i < correctAnswer.length; i++) {
    if (correctAnswer.length !== userAnswer.length) {
      break;
    } else if (correctAnswer[i] === userAnswer[i]) {
      score++;
    }
  }
  return score;
}

function showScore() {
  const quizContainer = document.querySelector(".quiz-container");

  //   show restart button
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.classList.add("restart-btn");
  quizContainer.appendChild(restartBtn);

  //   Show End Quiz button
  const endBtn = document.createElement("a");
  endBtn.textContent = "End Quiz";
  endBtn.classList.add("end-btn");
  quizContainer.appendChild(endBtn);

  //   Show Score
  const quizTitle = document.querySelector('h2')
  const scoreDisplay = document.createElement("h3");
  scoreDisplay.classList.add("score")
  scoreDisplay.textContent = `${calculateScore(
    correctAnswer,
    userAnswer
  )} / 10`;

  //   scoreDisplay.classList.add("end-btn");
  quizTitle.insertAdjacentElement("afterend", scoreDisplay);

  restartBtn.addEventListener("click", restartQuiz);
  endBtn.addEventListener("click", (e) => {
    e.target.href = "index.html";
  });
}

function restartQuiz() {
  // Reset questions
  questions.forEach((q) => {
    q.classList.add("hidden");
    q.classList.remove("shown");

    // Remove any selected answer highlights
    const buttons = q.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("selected"));
  });

  // Show first question again
  currentQuestion = 0;
  questions[currentQuestion].classList.remove("hidden");
  questions[currentQuestion].classList.add("shown");

  // Remove restart button
  const restartBtn = document.querySelector(".restart-btn");
  const endBtn = document.querySelector(".end-btn");
  const score = document.querySelector(".score");
  if (restartBtn) {
    restartBtn.remove();
    endBtn.remove();
    score.remove()
  }

  //   Reset answers
  userAnswer = [];
}
