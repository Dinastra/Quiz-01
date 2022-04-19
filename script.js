// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'Qual desses personagens se tornou o titã Colossal?',
    answers: [
      {
        answer: 'Armin Arlert',
        correct: true,
      },
      {
        answer: 'Mikasa Ackermann',
        correct: false,
      },
      {
        answer: 'Erwin Smith',
        correct: false,
      },
      {
        answer: 'Hange Zoe',
        correct: false,
      },
    ],
  },
  {
    question: 'Desses titãs, qual Eren Yeager não possui?:',
    answers: [
      {
        answer: 'Martelo de Guerra',
        correct: false,
      },
      {
        answer: 'Titã Fundador',
        correct: false,
      },
      {
        answer: 'Titã de Ataque',
        correct: false,
      },
      {
        answer: 'Titã Blindado',
        correct: true,
      },
    ],
  },
  {
    question: 'Quantos metros possui o titã Bestial de Zeke Yeager?',
    answers: [
      {
        answer: '12',
        correct: false,
      },
      {
        answer: '17',
        correct: true,
      },
      {
        answer: '15',
        correct: false,
      },
      {
        answer: '20',
        correct: false,
      },
    ],
  },
{
question: 'Qual desses personagens se tornou o último titã Mandíbula?',
    answers: [
      {
        answer: 'Gabi Braun',
        correct: false,
      },
      {
        answer: 'Falco Grice',
        correct: true,
      },
      {
        answer: 'Ymir',
        correct: false,
      },
      {
        answer: 'Porco Galliard',
        correct: false,
      },
    ],
  },
  {
    question: 'Quem se tornou o titã Sorridente, que aparece no primeiro episódio?',
        answers: [
          {
            answer: 'Grisha Yeager',
            correct: false,
          },
          {
            answer: 'Carla Yeager',
            correct: false,
          },
          {
            answer: 'Dina Fritz',
            correct: true,
          },
          {
            answer: 'Historia Reiss',
            correct: false,
          },
        ],
      },
      {
        question: 'Marque a alternativa incorreta:',
            answers: [
              {
                answer: 'Em orgem cronológica, Eren Kruger foi o primeiro Titã de Ataque apresentado',
                correct: false,
              },
              {
                answer: 'Reiner Braun é um dos enviados de Marley para a Ilha de Paradis',
                correct: false,
              },
              {
                answer: 'Levi teve que escolher entre Erwin e Armin, após o ataque de Berthold e Zeke',
                correct: false,
              },
              {
                answer: 'Em orgem cronológica, Eren Yeager foi o primeiro Titã de Ataque apresentado',
                correct: true,
              },
            ],
          },
          {
            question: 'Agora, marque a alternativa correta:',
                answers: [
                  {
                    answer: 'Ymir Fritz foi a primeira pessoa a receber o poder de titã',
                    correct: true,
                  },
                  {
                    answer: 'Annie Leonhart foi a pior de sua turma na seleção de guerreiros de Marley',
                    correct: false,
                  },
                  {
                    answer: 'Armin Arlert é o personagem menos inteligente da série',
                    correct: false,
                  },
                  {
                    answer: 'Levi Ackermann é irmão de Mikasa',
                    correct: false,
                  },
                ],
              },{
                question: 'Por fim, responda a última questão (ela é a mais importante!). Você daria para Evelyn Melo uma chance para iniciar na carreira de DEV Jr na sua empresa?:',
                    answers: [
                      {
                        answer: 'Não :(',
                        correct: false,
                      },
                      {
                        answer: 'Sim!',
                        correct: true,
                      },
                      {
                        answer: 'Com certeza!!! :)',
                        correct: true,
                      },
                    
                    ],
                  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou não o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quiz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();
