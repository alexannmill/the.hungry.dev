document.addEventListener("DOMContentLoaded", () => {
  // --- Set grid size
  const width = 52;
  const height = 7;
  // ---- Grabbing elements from the DOM
  const playingField = document.querySelector(".playing_field");
  const scoreDsp = document.querySelector("span");
  const startBtn = document.getElementById("start_btn");

  // ---- Building playing field/grid
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const innerDiv = document.createElement("div");
      playingField.appendChild(innerDiv);
    }
  }
  const days = document.querySelectorAll(".playing_field div");

  // ---- Setting initial index
  let currentInd = 0;
  let commitInd = 0;
  let snake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  const addSnakeClass = (position) => {
    return days[position].classList.add("snake");
  };
  const removeSnakeClass = (position) => {
    return days[position].classList.remove("snake");
  };

  // ---- Starting the game
  const start = (e) => {
    reset();
    randomCommit();
    scoreDsp.innerText = score;
    intervalTime = 700;
    snake = [3, 2, 1, 0];
    currentInd = 0;
    snake.forEach((i) => {
      addSnakeClass(i);
    });
    interval = setInterval(outcome, intervalTime);
  };
  // ---- Reset snake, food, score and and interval
  const reset = () => {
    snake.forEach((i) => removeSnakeClass(i));
    days[commitInd].classList.remove("commit");
    clearInterval(interval);
    score = 0;
  };

  // ---- checking against all outcomes in movement
  const outcome = () => {
    const head = snake[0];
    const tail = snake.pop();
    removeSnakeClass(tail);
    if (
      //snake hitting border;  bottom , top , left, right
      (head + width >= width * height && direction === width) ||
      (head - width <= 0 && direction === -width) ||
      (head % width === 0 && direction === 1) ||
      (head % width === width - 1 && direction === -1) ||
      //hitting itself
      days[head + direction].classList.contains("snake")
    ) {
      snake.forEach((i) => removeSnakeClass(i));
      return clearInterval(interval);
    }
    if (days[head + direction].classList.contains("commit")) {
      days[head + direction].classList.remove("commit");
      addSnakeClass(tail);
      snake.push(tail);
      randomCommit();
      score++;
      scoreDsp.innerText = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(outcome, intervalTime);
      return;
    }

    snake.unshift(head + direction);
    addSnakeClass(head + direction);
    return;
  };

  // ---- Link snake movements to key inputs
  const movement = (e) => {
    removeSnakeClass(currentInd);
    switch (e.keyCode) {
      // up
      case 38:
        direction = -width;
        break;

      // down
      case 40:
        direction = +width;
        break;

      // left
      case 37:
        direction = -1;
        break;

      // right
      case 39:
        direction = 1;
        break;

      default:
        break;
    }
  };

  const randomCommit = () => {
    commitInd = Math.floor(Math.random() * days.length);
    if (snake.includes(commitInd)) {
      randomCommit();
    }
    days[commitInd].classList.add("commit");
  };

  // ------------------add alert and colour changes
  const endGame = () => {
    clearInterval(interval);
  };

  document.addEventListener("keyup", movement);
  startBtn.addEventListener("click", start);
});
