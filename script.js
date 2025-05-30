const pages = {
  about: document.getElementById('about-page'),
  start: document.getElementById('start-screen'),
  quiz: document.getElementById('quiz-screen'),
  result: document.getElementById('result-screen')
};

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const resultImage = document.getElementById('result-image');
const resultTitle = document.getElementById('element-title');
const resultDesc = document.getElementById('element-description');

const questions = [
  {
    question: "Where do you feel most alive?",
    answers: [
      { text: "On top of a mountain", type: "Air" },
      { text: "Near the ocean", type: "Water" },
      { text: "Next to a bonfire", type: "Fire" },
      { text: "In a quiet forest", type: "Earth" }
    ]
  },
  {
    question: "What trait describes you best?",
    answers: [
      { text: "Adventurous", type: "Fire" },
      { text: "Peaceful", type: "Water" },
      { text: "Grounded", type: "Earth" },
      { text: "Imaginative", type: "Air" }
    ]
  },
  {
    question: "What’s your ideal vacation?",
    answers: [
      { text: "Camping in the woods", type: "Earth" },
      { text: "Island beach", type: "Water" },
      { text: "Hot desert safari", type: "Fire" },
      { text: "Skydiving experience", type: "Air" }
    ]
  },
  {
    question: "Pick a color:",
    answers: [
      { text: "Red", type: "Fire" },
      { text: "Blue", type: "Water" },
      { text: "Green", type: "Earth" },
      { text: "White", type: "Air" }
    ]
  }
];

const results = {
  Fire: {
    title: "🔥 You are Fire!",
    description: "Passionate, bold, and intense. You ignite the world around you.",
    image: "https://wallpapers-clan.com/wp-content/uploads/2023/05/fire-aesthetic-wallpaper-946x2048.jpg"
  },
  Water: {
    title: "🌊 You are Water!",
    description: "Calm, flowing, and emotional. You adapt and nurture life.",
    image: "https://wallpaperaccess.com/full/917964.jpg"
  },
  Earth: {
    title: "🌱 You are Earth!",
    description: "Stable, patient, and strong. You bring balance to chaos.",
    image: "https://i.pinimg.com/736x/8d/70/f3/8d70f3249d47f417bf8658420478ef35.jpg"
  },
  Air: {
    title: "🌬 You are Air!",
    description: "Free, creative, and curious. You inspire new ideas everywhere.",
    image: "https://i.pinimg.com/736x/50/01/65/500165570d580965ca3747da074de127.jpg"
  }
};

let currentQuestion = 0;
const score = { Fire: 0, Water: 0, Earth: 0, Air: 0 };

function goToStart() {
  switchPage('about', 'start');
}

function startQuiz() {
  switchPage('start', 'quiz');
  showQuestion();
}

function switchPage(from, to) {
  pages[from].classList.remove('active');
  pages[to].classList.add('active');
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans.text;
    btn.onclick = () => selectAnswer(ans.type);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(type) {
  score[type]++;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  switchPage('quiz', 'result');
  const topType = Object.keys(score).reduce((a, b) =>
    score[a] > score[b] ? a : b
  );
  resultTitle.textContent = results[topType].title;
  resultDesc.textContent = results[topType].description;
  resultImage.src = results[topType].image;
}

function restartQuiz() {
  currentQuestion = 0;
  for (let key in score) score[key] = 0;
  switchPage('result', 'start');
}
