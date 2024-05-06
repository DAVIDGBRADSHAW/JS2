const tiles = document.querySelectorAll(".tile");
const PLAYER_home = "home";
const PLAYER_away = "away";
let turn = PLAYER_away;

const boardState = Array(tiles.length);
boardState.fill(null);



tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("y-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }

  if (turn === PLAYER_home) {
    tile.innerText = PLAYER_home;
    boardState[tileNumber - 1] = PLAYER_home;
    turn = PLAYER_away;
  } else {
    tile.innerText = PLAYER_away;
    boardState[tileNumber - 1] = PLAYER_away;
    turn = PLAYER_away;
  }

  setHoverText();
  checkWinner();
}

function checkWinner() {
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

function startNewGame() {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_home;
  setHoverText();
}
