const score = require("./app.js");

// ---- Reset snake, food, score and and interval
const reset = () => {
  score = 0;
  days.forEach((i) => i.classList.remove("snake"));
  days.forEach((i) => i.classList.remove("commit"));
  clearInterval(interval);
};

const addSnakeClass = (position) => {
  return days[position].classList.add("snake");
};

const removeSnakeClass = (position) => {
  return days[position].classList.remove("snake");
};

const randomCommit = () => {
  commitInd = Math.floor(Math.random() * days.length);
  if (
    snake.includes(commitInd) ||
    days[commitInd].classList.contains("commit")
  ) {
    randomCommit();
  }
  days[commitInd].classList.add("commit");
};

// ------------------add alert and colour changes
const endGame = () => {
  reset();
};

module.exports = {
  reset,
  addSnakeClass,
  removeSnakeClass,
  randomCommit,
  endGame,
};
