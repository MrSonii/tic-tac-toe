import "./styles.css";

function handleBoxClick() {
  let currentValue = "o";
  const boxes = document.querySelectorAll("span");

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
      currentValue = getPlayerValue(currentValue);
      fillTheValue(this, currentValue);
      getTheWinner();
    });
  }

  function setPlayerValue(value) {
    currentValue = value;
  }

  return setPlayerValue;
}

const setPlayer = handleBoxClick(); //setPlayerValue('o')

function getPlayerValue(currentValue) {
  const playerMap = {
    x: "o",
    o: "x"
  };

  return playerMap[currentValue];
}

function fillTheValue(box, currentValue) {
  if (box.innerHTML === "") {
    box.innerHTML = currentValue;
    box.classList.add("filled");
  }
}

function getTheWinner() {
  const value = [];
  const boxes = document.querySelectorAll("span");
  const winningPoses = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  for (let i = 0; i < boxes.length; i++) {
    value.push(boxes[i].innerHTML);
  }

  for (const [a, b, c] of winningPoses) {
    if (value[a] && value[a] === value[b] && value[a] === value[c]) {
      winningScreen(value[a]);
    }
  }
}

function winningScreen(value) {
  document.querySelector(".parent").classList.add("opacity-3");

  const screen = document.createElement("div");

  screen.classList.add("screen");

  const winText = document.createElement("p");

  winText.innerHTML = `Player "${value}" Has Won The Game`;
  winText.classList.add("text-style");

  const restartButton = document.createElement("button");

  restartButton.innerHTML = "Play AGAIN !";
  restartButton.classList.add("restart-button");

  screen.appendChild(winText);
  screen.appendChild(restartButton);

  const parentClass = document.querySelector(".parent");

  document.body.insertBefore(screen, parentClass);

  restartButton.onclick = newGame;
}

function newGame() {
  const filledBoxes = document.querySelectorAll(".filled");
  const removeChild = document.querySelector(".screen");

  document.querySelector(".parent").classList.remove("opacity-3");
  document.body.removeChild(removeChild);

  for (let i = 0; i < filledBoxes.length; i++) {
    filledBoxes[i].innerHTML = "";
  }

  setPlayer("o");
}
