$(document).ready(() => {

  const choices = $('#choices');
  const confirmation = $('#confirmation');
  const content = $('.card-text');
  const startButton = $('#start');
  const timer = $('#timer');
  const title = $('.card-title');



  startButton.on('click', () => {
    let currentQuestion = 0

    startButton.remove();
    content.remove();

    timeLeft = questions.length * 15;
    timer.text('Time: ' + timeLeft);

    const writeQuestion = () => {
      title.text(questions[currentQuestion].title);
      choices.empty();
      for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
        const choice = $('<button>');
        choice.addClass('btn btn-primary btn-block choice-button');
        choice.attr('data-choice', questions[currentQuestion].choices[i]);
        choice.text(questions[currentQuestion].choices[i])
        choices.append(choice);
      }
    }

    writeQuestion();

    $('.choice-button').on('click', event => {
      const userChoice = $(event.target).data('choice');
      const answer = questions[currentQuestion].answer;

      currentQuestion++;
      writeQuestion();

      if (userChoice === answer) {
        confirmation.text('Correct!');
      } else {
        confirmation.text('Incorrect...');
      }
    });
  });
});