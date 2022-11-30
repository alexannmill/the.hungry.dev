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
  console.log("days.length:", days.length);

  // ---- Setting initial index
  let currentInd = 0;
  let commitInd = 0;
  let snake = [2, 1, 0];
  let x = 2;
  let y = 6;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  // ---- Starting the game
  const start = (e) => {
    reset();
    randomCommit();
    x = 2;
    y = 6;
    scoreDsp.innerText = score;
    intervalTime = 1000;
    snake = [2, 1, 0];
    currentInd = 0;
    snake.forEach((i) => {
      days[i].classList.add("snake");
    });
    interval = setInterval(outcome, intervalTime);
  };

  const addSnakeClass = (position) => {
    return days[position].classList.add("snake");
  };
  const removeSnakeClass = (position) => {
    return days[position].classList.remove("snake");
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
    console.log("snake:", snake);
    const head = snake[0];
    const tail = snake.pop();
    console.log("width:", width);
    console.log("direction:", direction);
    if (
      //snake hitting border;  top , bottom, left, right
      (head + height >= width * width && direction === width) ||
      (head - height <= 0 && direction === -width) ||
      (head % width === 0 && direction === 1) ||
      (head % width === width - 1 && direction === -1) ||
      //hitting itself
      days[head + direction].classList.contains("snake")
    ) {
      return clearInterval(interval);
    }

    if (days[head + direction].classList.contains("commit")) {
      days[head].classList.remove("apple");
      addSnakeClass(tail);
      snake.push(tail);
      randomCommit();
      score++;
      scoreDsp.textContent(score);
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(outcome, intervalTime);
    }
    removeSnakeClass(tail);
    snake.unshift(head + direction);
    addSnakeClass(head + direction);
  };

  // ---- Link snake movements to key inputs
  const movement = (e) => {
    removeSnakeClass(currentInd);
    switch (e.keyCode) {
      // up
      case 38:
        y += 1;
        break;

      // down
      case 40:
        y -= 1;
        break;

      // left
      case 37:
        x -= 1;
        break;

      // right
      case 39:
        x += 1;
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
    console.log("commitInd:", commitInd);
    days[commitInd].classList.add("commit");
    console.log("position[commitInd]:", days[commitInd]);
  };

  // ------------------add alert and colour changes
  const endGame = () => {
    clearInterval(interval);
  };

  document.addEventListener("keyup", movement);
  startBtn.addEventListener("click", start);
});
