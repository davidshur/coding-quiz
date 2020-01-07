$(document).ready(() => {
  const cardTitle = $('.card-title');
  const choices = $('#choices');
  const confirmation = $('#confirmation');
  const content = $('.card-text');
  const startButton = $('#start');
  const timer = $('#timer');

  let currentQuestion = 0;
  let quizComplete = false;
  let userScore = 0;

  const clearStartPage = () => {
    startButton.remove();
    content.remove();
  }

  const runTimer = () => {
    timeLeft = questions.length * 15;
    timer.text('Timer: ' + timeLeft);
    const timerInterval = setInterval(() => {
      if (userScore !== 0 || timeLeft <= 0) {
        clearInterval(timerInterval);
        makeScorePage();
      } else {
        timeLeft--;
        timer.text('Timer: ' + timeLeft);
      }
    }, 1000);
  }

  const makeScorePage = () => {
    userScore = timeLeft;
    alert('you scored' + userScore);
  }

  const checkAnswer = () => {
    $('.choice-button').on('click', event => {
      const userChoice = $(event.target).data('choice');
      const answer = questions[currentQuestion].answer;

      if (userChoice === answer) {
        confirmation.text('Correct!');
      } else {
        confirmation.text('Incorrect...');
        timeLeft -= 15;
      }

      if (currentQuestion >= questions.length - 1) {
        userScore = timeLeft;
      } else {
        currentQuestion++;
        fillQuestion();
      }
    });
  }

  const fillQuestion = () => {
    choices.empty();
    cardTitle.text(questions[currentQuestion].title);
    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
      const choice = $('<button>');
      choice.addClass('btn btn-primary btn-block choice-button');
      choice.attr('data-choice', questions[currentQuestion].choices[i]);
      choice.text(questions[currentQuestion].choices[i]);
      choices.append(choice);
    }
    checkAnswer();
  }

  startButton.on('click', () => {
    clearStartPage();
    fillQuestion();
    runTimer();
  });
});