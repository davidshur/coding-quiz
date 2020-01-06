$(document).ready(() => {
  const choices = $('#choices');
  const confirmation = $('#confirmation');
  const content = $('.card-text');
  const startButton = $('#start');
  const timer = $('#timer');
  const title = $('.card-title');

  let currentQuestion = 0

  const fillQuestion = () => {
    title.text(questions[currentQuestion].title);
    choices.empty();
    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
      const choice = $('<button>');

      choice.addClass('btn btn-primary btn-block choice-button');
      choice.attr('data-choice', questions[currentQuestion].choices[i]);
      choice.text(questions[currentQuestion].choices[i]);

      choices.append(choice);
    }
  }

  const clearStartPage = () => {
    startButton.remove();
    content.remove();
  }

  const runTimer = () => {
    timeLeft = questions.length * 15;
    timer.text('Timer: ' + timeLeft);
    setInterval(() => {
      timeLeft--;
      timer.text('Timer: ' + timeLeft);
    }, 1000);
  }

  startButton.on('click', () => {

    clearStartPage();
    fillQuestion();
    runTimer();

    $('.choice-button').on('click', event => {
      const userChoice = $(event.target).data('choice');
      const answer = questions[currentQuestion].answer;

      currentQuestion++;
      fillQuestion();

      if (userChoice === answer) {
        confirmation.text('Correct!');
      } else {
        confirmation.text('Incorrect...');
        timeLeft -= 15;
      }
    });
  });
});