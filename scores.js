$(document).ready(() => {
  const scoreList = $('#score-list');
  const highscoreList = Object.keys(localStorage);

  for (let i = 0; i < highscoreList.length; i++) {
    const userItem = $('<li>');
    userItem.text(highscoreList[i] + ' ------- ' + localStorage.getItem(highscoreList[i]));
    scoreList.append(userItem);
  }

  $('#reset').on('click', () => {
    localStorage.clear();
    location.reload();
  });
});