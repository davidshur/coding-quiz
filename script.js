$(document).ready(() => {
  const timer = $('#timer');
  const title = $('.card-title');
  const content = $('.card-text');
  const confirmation = $('#confirmation');
  const startButton = $('#start-button');

  let currentQuestion = 0

  const writeQuestion = () => {
    title.text(questions[currentQuestion].title);
    content.empty();
    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
      let choice = $('<button>');
      choice.addClass('btn btn-primary btn-block choice-button');
      choice.attr('data-choice', questions[currentQuestion].choices[i]);
      choice.text(questions[currentQuestion].choices[i])
      content.append(choice);
    }
  }

  $('#start-button').on('click', () => {


    // set quiz timer
    timeLeft = questions.length * 15;
    timer.text('Time: ' + timeLeft);

    // remove page content
    startButton.remove();
    content.text('');

    // populate page content
    title.text(questions[currentQuestion].title);
    writeQuestion();

    $('.choice-button').on('click', event => {
      let userChoice = $(event.target).data('choice');
      let answer = questions[currentQuestion].answer;

      if (userChoice === answer) {
        currentQuestion++;
        writeQuestion();
        confirmation.text('Correct!');
      } else {
        currentQuestion++;
        writeQuestion();
        confirmation.text('Incorrect...');
      }
    });
  });
});