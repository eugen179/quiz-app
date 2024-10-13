const questions = {
  general: {
      easy: [
          { question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid"], answer: 0 },
          { question: "Which planet is closest to the sun?", options: ["Earth", "Venus", "Mercury"], answer: 2 },
          { question: "What is the natural hardest substance on earth?", options: ["Silver", "Diamond", "Gold"], answer: 1 },
          { question: "In which year did the world 2 end?", options: ["1920", "1963", "1945"], answer: 2 }
      ],
      medium: [
          { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe"], answer: 1 },
          { question: "Who painted the monalisa?", options: ["Leonardo da Vinci", "King James", "Peter salasya"], answer: 0 },
          { question: "Who discovered penicillin?", options: ["Ludwig craft", "Eugene Maina", "Alexander Fleming"], answer: 2},
          { question: "Who was the first person to walk on the moon?", options: ["Neil Armstrong", "Elon Musk", "Bill Gates"], answer: 0 }
      ],
      hard: [
          { question: "What is the square root of 144?", options: ["12", "14", "16"], answer: 0 },
          { question: "What is the square root of 576?", options: ["30", "24", "16"], answer: 1},
          { question: "What is the square root of 2025?", options: ["49", "50", "45"], answer: 2 },
          { question: "What is the square root of 8281?", options: ["89", "91", "90"], answer: 1 }
      ]
  },
  science: {
      easy: [
          { question: "What is H2O?", options: ["Water", "Oxygen", "Hydrogen"], answer: 0 },
          { question: "How many planets are in our solar system?", options: ["15","8", "10"], answer: 1},
          { question: "What is the chemial symbol of Gold?", options: ["Au", "Ag", "o"], answer: 0 },
          { question: "What force keeps objects grounded the earth?", options: ["Frictional force", "Normal force", "Gravity"], answer: 2 }
      ],
      medium: [
          { question: "What planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Saturn"], answer: 0 },
          { question: "What is the most abundant element in the universe?", options: ["Nitrogen", "Oxygenr", "Hydrogen"], answer: 2 },
          { question: "What planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Saturn"], answer: 0 },
          { question: "How many chambers does a human heart have?", options: ["2", "4", "3"], answer: 1 }
      ],
      hard: [
        { question: "What is the main component of earth core?", options: ["Iron", "Silver", "Gold"], answer: 0 },
        { question: "What is the main funtion of the large intestine?", options: ["Storage of food", "Digestion", "Water absorption"], answer: 2 },
        { question: "What particle has a positive charge in an atom?", options: ["Neutron", "Proton", "Nitrogen"], answer: 1 },
        { question: "what is the primary funtion of ribosomes ?", options: ["Protien digestion", "Protien storage", "Protien synthesis"], answer: 2}
         ]
  },
  geography: {
    easy: [
        { question: "Which continent is Kenya in?", options: ["Africa", "Asia", "Europe"], answer: 0 },
        { question: "Which continent is Known as the dark continent?", options: ["Europe", "Asia", "Afroca"], answer: 2},
        { question: "Which continent is the longest river in the world?", options: ["Rive Nile", "Tana river", "Zambezi river"], answer: 0 },
        { question: "Which continent is Tanzania in?", options: ["Asia", "Africa", "Europe"], answer: 1 }
    ],
    medium: [
        { question: "What is the capital of Japan?", options: ["Tokyo", "Beijing", "Seoul"], answer: 0 },
        { question: "Which country has the largest land area?", options: ["Canada", "China", "Russia"], answer: 2 },
        { question: "Which continent is the sahara desert located?", options: ["Africa", "Asia", "North America"], answer: 0 },
        { question: "What is the capital of Autralia?", options: ["Sydney", "Canberra", "Melbourne"], answer: 1 }
    ],
    hard: [
        { question: "Which country has the longest coastline?", options: ["Canada", "Russia", "Australia"], answer: 0 },
        { question: "What is the smallest country in the world ?", options: ["Canada", "Russia", "Vatican city"], answer: 2},
        { question: "Which mountain range separates Europe and Asia?", options: ["Andes", "Ural Mountains", "Rocky mountains"], answer: 1 },
        { question: "What type of rock is formed from molten lava?", options: ["Igneous rock", "Sedimentary rocks", "Metamophic rocks"], answer: 0 }
    ]
}
};


let currentCategory, currentDifficulty, currentQuestionIndex, score, totalQuestions, timerInterval, timeLeft;

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("nextButton").addEventListener("click", nextQuestion);
document.getElementById("restartButton").addEventListener("click", restartQuiz);

function startQuiz() {
  currentCategory = document.getElementById("categorySelect").value;
  currentDifficulty = document.getElementById("difficultySelect").value;
  currentQuestionIndex = 0;
  score = 0;
  totalQuestions = questions[currentCategory][currentDifficulty].length;

  document.getElementById("category").classList.add("hidden");
  document.getElementById("difficulty").classList.add("hidden");
  document.getElementById("startQuiz").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");
  document.getElementById("resultContainer").classList.add("hidden");

  showQuestion();
}

function showQuestion() {
  const questionData = questions[currentCategory][currentDifficulty][currentQuestionIndex];
  document.getElementById("question").textContent = questionData.question;
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  questionData.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => selectAnswer(index));
      optionsContainer.appendChild(button);
  });

  document.getElementById("nextButton").classList.add("hidden");
  startTimer();
}

function selectAnswer(selectedIndex) {
  const questionData = questions[currentCategory][currentDifficulty][currentQuestionIndex];
  const optionsButtons = document.querySelectorAll("#optionsContainer button");

  optionsButtons[questionData.answer].classList.add("correct");

  if (selectedIndex === questionData.answer) {
      score++;
  } else {
      optionsButtons[selectedIndex].classList.add("wrong");
  }

  document.getElementById("nextButton").classList.remove("hidden");
  stopTimer();
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < totalQuestions) {
      showQuestion();
  } else {
      showResults();
  }
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("time").textContent = timeLeft;
  timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
      if (timeLeft === 0) {
          stopTimer();
          autoAnswer();
      }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function autoAnswer() {
  const questionData = questions[currentCategory][currentDifficulty][currentQuestionIndex];
  const optionsButtons = document.querySelectorAll("#optionsContainer button");
  optionsButtons[questionData.answer].classList.add("correct");
  document.getElementById("nextButton").classList.remove("hidden");
}

function showResults() {
  document.getElementById("quizContainer").classList.add("hidden");
  document.getElementById("resultContainer").classList.remove("hidden");

  document.getElementById("score").textContent = `Your score: ${score}/${totalQuestions}`;

  let feedback;
  const scorePercentage = (score / totalQuestions) * 100;
  if (scorePercentage >= 90) {
      feedback = "Excellent! You've mastered this topic!";
  } else if (scorePercentage >= 70) {
      feedback = "Great job! You have a strong understanding.";
  } else if (scorePercentage >= 50) {
      feedback = "Good effort! You can improve with more practice.";
  } else {
      feedback = "Don't give up! Keep studying and try again.";
  }
  document.getElementById("feedback").textContent = feedback;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("category").classList.remove("hidden");
  document.getElementById("difficulty").classList.remove("hidden");
  document.getElementById("startQuiz").classList.remove("hidden");
  document.getElementById("quizContainer").classList.add("hidden");
  document.getElementById("resultContainer").classList.add("hidden");
}