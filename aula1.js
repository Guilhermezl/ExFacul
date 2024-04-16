const http = require('http');
http.createServer((request,response)=>{
  resposta.writeHead(200,
    {'Content-Type':'text/plain'
  });
  resposta.write('Hello Word');
  resposta.end();
  

}).listen(1337);



const databaseQuiz = [
  { question: "O que é SQL?", options: ["Linguagem de consulta estruturada", "Linguagem de programação", "Linguagem de marcação"], answer: 0 },
  { question: "O que é um índice em um banco de dados?", options: ["Um tipo de dado", "Uma estrutura de dados que melhora a velocidade de recuperação de registros", "Um tipo de chave estrangeira"], answer: 1 },
  { question: "O que é normalização em banco de dados?", options: ["Processo de tornar os dados não redundantes", "Processo de tornar os dados redundantes", "Processo de tornar os dados incompletos"], answer: 0 }
];

const oopQuiz = [
  { question: "O que é encapsulamento?", options: ["Capacidade de um objeto de se esconder de outros objetos", "Capacidade de um objeto de se comunicar com outros objetos", "Capacidade de um objeto de herdar propriedades de outros objetos"], answer: 0 },
  { question: "O que é herança?", options: ["Capacidade de um objeto de se esconder de outros objetos", "Capacidade de um objeto de se comunicar com outros objetos", "Capacidade de um objeto de herdar propriedades de outros objetos"], answer: 2 },
  { question: "O que é polimorfismo?", options: ["Capacidade de um objeto de se esconder de outros objetos", "Capacidade de um objeto de se comunicar com outros objetos", "Capacidade de um objeto de herdar propriedades de outros objetos"], answer: 1 }
];

const htmlCssJsQuiz = [
  { question: "O que é HTML?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], answer: 0 },
  { question: "O que é CSS?", options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"], answer: 2 },
  { question: "Qual é a linguagem de programação para interatividade em páginas web?", options: ["Java", "JavaScript", "Python"], answer: 1 }
];

let currentQuiz = [];
let currentQuestionIndex = 0;

function startQuiz(quizType) {
  if (quizType === 'database') {
    currentQuiz = databaseQuiz;
    document.getElementById('quiz-title').textContent = 'Quiz de Banco de Dados';
  } else if (quizType === 'oop') {
    currentQuiz = oopQuiz;
    document.getElementById('quiz-title').textContent = 'Quiz de Programação Orientada a Objetos';
  } else if (quizType === 'html_css_js') {
    currentQuiz = htmlCssJsQuiz;
    document.getElementById('quiz-title').textContent = 'Quiz de HTML, CSS e JavaScript';
  }

  showQuestion(currentQuestionIndex);
  document.getElementById('quiz-container').classList.remove('hidden');
}

function showQuestion(index) {
  const questionContainer = document.getElementById('question-container');
  const question = currentQuiz[index];
  questionContainer.innerHTML = `
    <h3>${question.question}</h3>
    <ul>
      ${question.options.map((option, idx) => `<li><input type="radio" name="answer" value="${idx}">${option}</li>`).join('')}
    </ul>
  `;
}

function nextQuestion() {
  const answerInputs = document.getElementsByName('answer');
  let selectedOption = -1;
  for (let i = 0; i < answerInputs.length; i++) {
    if (answerInputs[i].checked) {
      selectedOption = parseInt(answerInputs[i].value);
      break;
    }
  }
  if (selectedOption === -1) {
    alert("Por favor, selecione uma opção.");
    return;
  }

  // Comparando a resposta selecionada com a resposta correta
  const currentQuestion = currentQuiz[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    // Resposta correta
    alert("Resposta correta!");
  } else {
    // Resposta incorreta
    alert("Resposta incorreta.");
  }

  // Indo para a próxima questão
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    showQuestion(currentQuestionIndex);
  } else {
    // Quiz concluído
    alert("Quiz concluído!");
    document.getElementById('quiz-container').classList.add('hidden');
  }
}
