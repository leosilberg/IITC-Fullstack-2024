console.clear();

function generateRandomNum() {
  return Math.floor(Math.random() * 10);
}

function generateRandomArray(size) {
  let temp = [];
  for (let index = 0; index < size; index++) {
    let rand = -1;
    do {
      rand = generateRandomNum();
    } while (temp.includes(rand));
    temp[index] = rand;
  }
  return temp;
}

function checkInputResult(inputNums) {
  let bulls = 0;
  let cows = 0;
  for (let index = 0; index < inputNums.length; index++) {
    if (inputNums[index] === generatedNums[index]) {
      bulls++;
    } else if (generatedNums.includes(inputNums[index])) {
      cows++;
    }
  }
  displayResult(bulls, cows);
  return bulls;
}

function checkUniqueInputs(inputNums) {
  let set = new Set(inputNums);
  return set.size === inputNums.length;
}

function displayWin() {
  const board = document.querySelector("#board");
  const element = document.createElement("p");
  element.classList = "card";
  element.innerText = "You guessed in " + turns + " turns";
  board.appendChild(element);
}

function displayHistory() {
  const histroy = document.querySelector("#history");
  const card = document.createElement("div");
  card.classList = "card";
  const lastGame = gameHistory[gameHistory.length - 1];
  for (const key in lastGame) {
    const element = document.createElement("p");
    element.innerText = lastGame[key];
    card.appendChild(element);
  }
  histroy.appendChild(card);
}

function displayUniqueError() {
  const result = document.querySelector("#result" + turns);
  const element = document.createElement("p");
  element.innerText = "Duplicates";
  if (result.childElementCount == 1) {
    result.appendChild(element);
  }
}
function displayResult(bulls, cows) {
  const result = document.querySelector("#result" + turns);
  result.innerHTML = "";
  const bullsElem = document.createElement("p");
  bullsElem.innerText = bulls;
  const cowsElem = document.createElement("p");
  cowsElem.innerText = cows;
  result.appendChild(bullsElem);
  result.appendChild(cowsElem);
}
function displayNumpad() {
  const numpad = document.querySelector("#numpad");
  for (let index = 0; index < 10; index++) {
    const element = document.createElement("button");
    element.innerText = index;
    element.addEventListener("click", function (event) {
      const input = document.querySelector(
        "#input" + turns + "-" + currentFocusIndex
      );
      input.value = event.target.innerText;
      focusNextInput(currentFocusIndex);
    });
    numpad.appendChild(element);
  }
}
function displayRow(nums) {
  const board = document.querySelector("#board");
  const card = document.createElement("div");
  card.classList = "card";
  card.appendChild(displayInputContent(nums));
  card.appendChild(displayResultContent());
  board.appendChild(card);
  focusNextInput(-1);
  document.querySelector(".buttons").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function displayInputContent(nums) {
  const content = document.createElement("div");
  content.classList = "input-content";
  nums.forEach((num, index) => {
    const element = document.createElement("input");
    element.value = num;
    element.id = "input" + turns + "-" + index;
    element.addEventListener("keydown", function (event) {
      if (isFinite(event.key)) {
        event.target.value = "";
      } else {
        event.preventDefault();
      }
    });
    element.addEventListener("input", (event) => {
      focusNextInput(index);
    });
    element.addEventListener("focus", (event) => {
      currentFocusIndex = index;
    });
    content.appendChild(element);
  });
  return content;
}
function displayResultContent() {
  const content = document.createElement("div");
  content.id = "result" + turns;
  content.className = "result-content";
  const guessButton = document.createElement("button");
  guessButton.innerText = "Go";
  guessButton.addEventListener("click", (event) => {
    checkTurn();
  });
  content.appendChild(guessButton);
  return content;
}
function focusNextInput(index) {
  currentFocusIndex = index + 1 == boardSize ? 0 : index + 1;
  document.querySelector("#input" + turns + "-" + currentFocusIndex).focus();
}

function checkTurn() {
  let inputNums = [];
  for (let index = 0; index < boardSize; index++) {
    const input = document.querySelector("#input" + turns + "-" + index);
    inputNums[index] = parseInt(input.value);
  }
  if (!checkUniqueInputs(inputNums)) {
    displayUniqueError();
    return;
  }
  if (checkInputResult(inputNums, generatedNums) == boardSize) {
    displayWin();
    clearInterval(timer);
    gameHistory.push({
      name: userName,
      guesses: turns,
      timeTaken: Math.floor((new Date().getTime() - startTime) / 1000) + "s",
    });
    displayHistory();
  } else {
    turns++;
    displayRow(inputNums);
  }
}

function changeBoardSize() {
  let input = document.querySelector("#boardSize").value;
  if (isFinite(input)) {
    boardSize = parseInt(input);
    clearInterval(timer);
    startGame();
  }
}

function startGame() {
  turns = 0;
  const board = document.querySelector("#board");
  board.innerHTML = "";
  generatedNums = generateRandomArray(boardSize);
  displayRow(Array(boardSize).fill(""));
  displayResult("Bulls", "Cows");
  turns = 1;
  currentFocusIndex = 0;
  displayRow(generateRandomArray(boardSize));
  startTime = new Date().getTime();
  timer = setInterval(updateTimer, 1000);
}

function showSolution() {
  turns++;
  displayRow(generatedNums);
  checkTurn();
}

function updateTimer() {
  let element = document.querySelector("#timer");
  let timeDifference = new Date().getTime() - startTime;
  element.innerText = Math.floor(timeDifference / 1000) + "s";
}

function enterUsername() {
  let element = document.querySelector("#userName");
  userName = element.value;
  startGame();
}

let gameHistory = [];
let boardSize = 3;
let generatedNums = [];
let turns;
let currentFocusIndex;
let startTime;
let timer;
let userName;
displayNumpad();
