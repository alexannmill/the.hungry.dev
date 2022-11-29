// // Build playing field
// const playingField = document.getElementById("playing_field");
// for (const i = 0; i <= 625; i++) {
//   const innerDiv = document.createElement("div");
//   innerDiv.classList.add("grid_div");
//   playingField.appendChild(innerDiv);
// }

document.addEventListener("DOMContentLoaded", () => {
  const playingField = document.getElementsByClassName("playing_field");
  console.log("playingField:", playingField);
  for (let i = 0; i <= 30; i++) {
    for (let x = 0; x <= 30; x++) {
      const innerDiv = document.createElement("div");
      innerDiv.classList.add("grid_div");
      playingField[0].appendChild(innerDiv);
    }
    const next = document.createElement("br");
    playingField[0].appendChild(next);
  }
});
