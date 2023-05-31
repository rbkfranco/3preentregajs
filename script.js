const quizForm = document.getElementById('quiz-form');
const resultContainer = document.getElementById('result-container');
const restartButton = document.getElementById('restart-button');

const houses = [
  {
    name: 'Casa Stark',
    characteristics: 'Valientes y honorables',
    className: 'house-stark'
  },
  {
    name: 'Casa Targaryen',
    characteristics: 'Valientes y despiadados',
    className: 'house-targaryen'
  },
  {
    name: 'Casa Lannister',
    characteristics: 'Astutos y ambiciosos',
    className: 'house-lannister'
  },
  {
    name: 'Casa Baratheon',
    characteristics: 'Firmes y justos',
    className: 'house-baratheon'
  }
];

quizForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const answers = [];
  const questions = quizForm.getElementsByTagName('input');

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].checked) {
      answers.push(parseInt(questions[i].value));
    }
  }

  if (answers.length === 6) {
    const total = answers.reduce((acc, curr) => acc + curr, 0);
    const houseIndex = Math.floor(total / 10);
    const chosenHouse = houses[houseIndex];

    resultContainer.innerHTML = `
      <h2>¡Eres parte de ${chosenHouse.name}!</h2>
      <p>Características: ${chosenHouse.characteristics}</p>
    `;
    resultContainer.style.display = 'block';

    localStorage.setItem('chosenHouse', JSON.stringify(chosenHouse));
    restartButton.style.display = 'block';
  } else {
    resultContainer.innerHTML = '<p>Por favor, responde todas las preguntas.</p>';
    resultContainer.style.display = 'block';
    restartButton.style.display = 'none';
  }
});

restartButton.addEventListener('click', function() {
  localStorage.removeItem('chosenHouse');
  resultContainer.innerHTML = '';
  resultContainer.style.display = 'none';
  restartButton.style.display = 'none';

  // Reiniciar las respuestas seleccionadas en el formulario
  const questions = quizForm.getElementsByTagName('input');
  for (let i = 0; i < questions.length; i++) {
    questions[i].checked = false;
  }
});

window.addEventListener(function() {
  const previousResult = localStorage.getItem('chosenHouse');

  if (previousResult) {
    resultContainer.innerHTML = `
      <h2>¡Eres parte de ${JSON.parse(previousResult).name}!</h2>
      <p>Características: ${JSON.parse(previousResult).characteristics}</p>
    `;
    resultContainer.style.display = 'block';
    restartButton.style.display = 'block';
  }
});
