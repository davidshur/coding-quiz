$(document).ready(() => {
  const confirmation = $('#confirmation');
  const content = $('.card-text');
  const timer = $('#timer');
  const title = $('.card-title');

  $('#start').on('click', function() {
    let q = 0;
    let timeLeft = questions.length * 15;
    let userScore;

    timer.text('Timer: ' + timeLeft);

    const runTimer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(runTimer);
        timer.text('Timer: 0');
        userScore = 0;
        createScorePage();
      } else {
        timeLeft--;
        timer.text('Timer: ' + timeLeft);
      }
    }, 1000);

    $('#start').remove();
    content.text('');

    const createQuestionPage = () => {
      $('#choices').empty();
      title.text(questions[q].title);
      for (let i = 0; i < questions[q].choices.length; i++) {
        const choice = $('<button>');
        choice.addClass('btn btn-primary btn-block choice-button');
        choice.attr('data-choice', questions[q].choices[i]);
        choice.text(questions[q].choices[i]);
        $('#choices').append(choice);
      }

      $('.choice-button').on('click', function() {
        const answer = questions[q].answer;
        const userChoice = $(this).attr('data-choice');

        const clearConfirmation = setTimeout(() => {
          confirmation.empty();
        }, 1000);

        if (userChoice === answer) {
          confirmation.text('Correct!');
          clearConfirmation;
        } else {
          timeLeft -= 15;
          confirmation.text('Incorrect...');
          clearConfirmation;
        }

        if (q >= questions.length - 1) {
          clearInterval(runTimer);
          if (timeLeft <= 0) {
            userScore = 0;
          } else {
            userScore = timeLeft;
          }
          createScorePage();
        } else {
          q++;
          createQuestionPage();
        }
      });
    }

    const createScorePage = () => {
      const scoreForm = $('<form>');
      const formGroup = $('<div>');
      const inputLabel = $('<label>');
      const userInput = $('<input>');
      const submitButton = $('<button>');

      timer.text('Timer: 0');
      $('#choices').empty();
      title.text('The quiz is over!');
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
        const initials = $('#user-initials').val();
        localStorage.setItem(initials, userScore);
        console.log(localStorage);
      });
    }

    runTimer;
    createQuestionPage();
  });
});