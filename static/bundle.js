(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { reset } = require("./helpers");

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

  const addSnakeClass = (position) => {
    return days[position].classList.add("snake");
  };
  const removeSnakeClass = (position) => {
    return days[position].classList.remove("snake");
  };

  // ---- Starting the game
  const start = (e) => {
    // reset();
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
      return endGame();
    }
    const tail = snake.pop();
    removeSnakeClass(tail);
    snake.unshift(head + direction);
    addSnakeClass(head + direction);

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

  document.addEventListener("keyup", movement);
  startBtn.addEventListener("click", start);
});

},{"./helpers":2}],2:[function(require,module,exports){
// ---- Reset snake, food, score and and interval
const reset = () => {
  score = 0;
  days.forEach((i) => i.classList.remove("snake"));
  days.forEach((i) => i.classList.remove("commit"));
  clearInterval(interval);
};

module.exports = {
  reset,
};

},{}]},{},[1,2]);
