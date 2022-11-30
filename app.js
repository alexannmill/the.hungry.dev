document.addEventListener("DOMContentLoaded", () => {
  // --- Set grid size
  const width = 25;
  // ---- Grabbing elements from the DOM
  const playingField = document.getElementById("playing_field");
  // const ctx = canvas.getContext("2d");
  const scoreDsp = document.querySelector("span");
  const startBtn = document.getElementById("start_btn");

  // ---- Building playing field/grid
  for (let i = 0; i < width; i++) {
    for (let x = 0; x < width; x++) {
      const innerDiv = document.createElement("div");
      playingField[0].appendChild(innerDiv);
    }
    const next = document.createElement("br");
    playingField[0].appendChild(next);
  }
  const positions = document.querySelectorAll(".playing_field div");
  console.log("positions.length:", positions.length);

  // ---- Setting initial index
  let currentInd = 0;
  let appleInd = 0;
  let snake = [2, 1, 0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  // ---- Starting the game
  const start = (e) => {
    reset();
    randomApple();
    direction = 1;
    scoreDsp.innerText = score;
    intervalTime = 1000;
    snake = [2, 1, 0];
    currentInd = 0;
    snake.forEach((i) => {
      positions[i].classList.add("snake");
    });
    interval = setInterval(outcome, intervalTime);
  };

  const addSnakeClass = (position) => {
    return positions[position].classList.add("snake");
  };
  const removeSnakeClass = (position) => {
    return positions[position].classList.remove("snake");
  };
  // ---- Reset snake, apple, score and and interval
  const reset = () => {
    snake.forEach((i) => removeSnakeClass(i));
    positions[appleInd].classList.remove("apple");
    clearInterval(interval);
    score = 0;
  };

  // ---- checking against all outcomes in movement
  const outcome = () => {
    console.log("snake:", snake);
    const head = snake[0];
    const tail = snake.pop();

    if (
      //snake hitting border;  top , bottom, left, right
      (head + width >= width * width && direction === width) ||
      (head - width <= 0 && direction === -width) ||
      (head % width === 0 && direction === 1) ||
      (head % width === width - 1 && direction === -1) ||
      //hitting itself
      positions[head + direction].classList.contains("snake")
    ) {
      return clearInterval(interval);
    }

    if (positions[head + direction].classList.contains("apple")) {
      positions[head].classList.remove("apple");
      addSnakeClass(tail);
      snake.push(tail);
      randomApple();
      score++;
      scoreDsp.innerText(score);
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

  const randomApple = () => {
    appleInd = Math.floor(Math.random() * positions.length);
    if (snake.includes(appleInd)) {
      randomApple();
    }
    console.log("appleInd:", appleInd);
    positions[appleInd].classList.add("apple");
    console.log("position[appleInd]:", positions[appleInd]);
  };

  // ------------------add alert and colour changes
  const endGame = () => {
    clearInterval(interval);
  };

  document.addEventListener("keyup", movement);
  document.addEventListener("click", start);
});
