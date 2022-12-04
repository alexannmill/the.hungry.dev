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

  // ---- Global vars, setting initial game
  let currentInd = 0;
  let commitInd = 0;
  let snake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

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

  // ---- Starting the game
  const start = (e) => {
    randomCommit();
    randomCommit();
    randomCommit();
    randomCommit();
    randomCommit();
    randomCommit();
    scoreDsp.innerText = score;
    intervalTime = 300;
    snake = [3, 2, 1, 0];
    currentInd = 0;
    snake.forEach((i) => {
      addSnakeClass(i);
    });
    interval = setInterval(outcome, intervalTime);
  };

  // ---- checking against all outcomes in movement
  const outcome = () => {
    const head = snake[0];
    if (
      //snake hitting border;  bottom , top , left, right
      (head + width >= width * height && direction === width) ||
      (head - width <= 0 && direction === -width) ||
      (head % width === 0 && direction === 1) ||
      (head % width === width - 1 && direction === -1) ||
      //hitting itself
      days[head + direction].classList.contains("snake")
    ) {
      endGame();
      return reset();
    }
    // Rendering snake movement
    const tail = snake.pop();
    removeSnakeClass(tail);
    snake.unshift(head + direction);
    addSnakeClass(head + direction);

    // Eating a commit
    if (days[head + direction].classList.contains("commit")) {
      days[head + direction].classList.remove("commit");
      snake.push(tail);
      addSnakeClass(tail);
      randomCommit();
      score++;
      scoreDsp.innerText = score;
      clearInterval(interval);
      interval = setInterval(outcome, intervalTime * speed);
      return;
    }
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
  };

  document.addEventListener("keyup", movement);
  startBtn.addEventListener("click", start);
});
