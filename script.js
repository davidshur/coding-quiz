$(document).ready(() => {
  const cardTitle = $('.card-title');
  const choices = $('#choices');
  const confirmation = $('#confirmation');
  const content = $('.card-text');
  const startButton = $('#start');
  const timer = $('#timer');

  startButton.on('click', () => {
    let currentQuestion = 0;
    let userScore = 0;
    timeLeft = questions.length * 15;
    timer.text('Timer: ' + timeLeft);

    const runTimer = setInterval(() => {
        if (userScore !== 0 || timeLeft <= 0) {
          clearInterval(runTimer);
          timer.text('Timer: 0');
          makeScorePage();
        } else {
          timeLeft--;
          timer.text('Timer: ' + timeLeft);
        }
      }, 1000);

    const clearStartPage = () => {
      startButton.remove();
      content.text('');
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

    const checkAnswer = () => {
      $('.choice-button').on('click', event => {
        const userChoice = $(event.target).data('choice');
        const answer = questions[currentQuestion].answer;

        if (userChoice === answer) {
          confirmation.text('Correct!');
        } else {
          timeLeft -= 15;
          confirmation.text('Incorrect...');
        }

        setTimeout(() => {
          confirmation.empty();
        }, 1000);

        if (currentQuestion >= questions.length - 1) {
          if (timeLeft <= 0) {
            userScore = 0;
          } else {
            userScore = timeLeft;
          }
        } else {
          currentQuestion++;
          fillQuestion();
        }
      });
    }

    const makeScorePage = () => {
      const scoreForm = $('<form>');
      const formGroup = $('<div>');
      const inputLabel = $('<label>');
      const userInput = $('<input>');
      const submitButton = $('<button>');

      choices.empty();
      cardTitle.text('The quiz is over!');
      content.text('You scored ' + userScore + ' points! I knew you had it in ya.');

      inputLabel.text('Enter your initials: ');
      inputLabel.attr('for', 'user-initials');

      userInput.addClass('form-control');
      userInput.attr('id', 'user-initials');

      submitButton.text('Submit');
      submitButton.addClass('btn btn-primary');
      submitButton.attr('type', 'submit');
      submitButton.attr('id', 'submit');

      formGroup.addClass('form-group');
      formGroup.append(inputLabel, userInput);

      scoreForm.append(formGroup, submitButton);
      content.append(scoreForm);

      $('#submit').on('click', event => {
        event.preventDefault();
        const initials = $('#user-initials').val();
        localStorage.setItem(initials, userScore);
        console.log(localStorage);
      });
    }

    runTimer;
    clearStartPage();
    fillQuestion();
  });
});