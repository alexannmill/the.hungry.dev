// ---- Adding and removing snake class
const addSnakeClass = (position) => {
  return days[position].classList.add("snake");
};
const removeSnakeClass = (position) => {
  return days[position].classList.remove("snake");
};

// ---- Random commit within playing field
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

// ---- reset vars at initial or end of game
const reset = () => {
  score = 0;
  scoreDsp.innerText = score;
  days.forEach((i) => i.classList.remove("snake"));
  days.forEach((i) => i.classList.remove("commit"));
  clearInterval(interval);
};

// ------------------add alert and colour changes
const endGame = () => {
  alert(`Game Over, Final score = ${score}`);
  reset();
};

module.exports = {
  addSnakeClass,
  removeSnakeClass,
  randomCommit,
};
