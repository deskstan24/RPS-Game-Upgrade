//The necessary variables that selects the HTML elements
let resultDisplay = document.querySelector(".result");
let userScoreDisplay = document.querySelector(".user-score");
let computerScoreDisplay = document.querySelector(".computer-score");
let endgameDisplay = document.querySelector(".end-game");
let numberOfGamesInput = document.querySelector("input");

let startGameBtn = document.querySelector(".start-game");
let rockBtn = document.querySelector(".rock");
let paperBtn = document.querySelector(".paper");
let scissorsBtn = document.querySelector(".scissors");

//keep track of score
let userScore = 0;
let computerScore = 0;

let numberOfGames = 0;
let roundsPlayed = 0;

//Disable Buttons initially
rockBtn.disabled = true;
paperBtn.disabled = true;
scissorsBtn.disabled = true;

//Take user's input for number of games
numberOfGamesInput.addEventListener("change", () => {
  let userValue = parseInt(numberOfGamesInput.value);
  //Ensure the number selected by the user is valid
  if (isNaN(userValue) || userValue <= 0) {
    alert("Please insert a valid input");
    numberOfGamesInput.value = 5;
  } else {
    numberOfGames = userValue;
  }
});

// Start Game
startGameBtn.addEventListener("click", () => {
  if (numberOfGames === 0) {
    alert("Enter a valid number before games starts");
    return;
  }

  //Reset Scores
  userScore = 0;
  computerScore = 0;
  roundsPlayed = 0;
  resultDisplay.textContent = "";
  endgameDisplay.textContent = "";
  userScoreDisplay.textContent = "Your Score: 0";
  computerScoreDisplay.textContent = "Computer Score: 0";

  //Enable buttons
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
});

//Generate computer's choice
function getComputerChoice() {
  let computerOptions = ["rock", "paper", "scissors"];
  let computerNumber = Math.floor(Math.random() * 3);
  let computerInput = computerOptions[computerNumber];

  return computerInput;
}

//Play a single game
function playGame(userChoice) {
  if (roundsPlayed >= numberOfGames) return;

  let computerChoice = getComputerChoice();
  roundsPlayed++;

  if (computerChoice == userChoice) {
    resultDisplay.textContent = `It's a Draw! Both chose ${userChoice}`;
  } else if (
    (computerChoice == "rock" && userChoice == "paper") ||
    (computerChoice == "paper" && userChoice == "scissors") ||
    (computerChoice == "scissors" && userChoice == "rock")
  ) {
    resultDisplay.textContent = `You Win! ${userChoice} beats ${computerChoice}`;
    userScore++;
  } else {
    resultDisplay.textContent = `You Lose! ${computerChoice} beats ${userChoice}`;
    computerScore++;
  }

  //Display Scores
  userScoreDisplay.textContent = `Your Score: ${userScore}`;
  computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;

  //Check if game is over
  if (roundsPlayed >= numberOfGames) {
    checkGameover();
  }
}

//End game
function checkGameover() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;

  if (userScore > computerScore) {
    endgameDisplay.innerHTML = "--Game Over-- <br> 🎉 You won the game!";
  } else if (computerScore > userScore) {
    endgameDisplay.innerHTML = "--Game Over-- <br>💻 Computer won the game!";
  } else {
    endgameDisplay.innerHTML = "--Game Over-- <br> It's a tie!";
  }
}

//Event Listeners for Buttons
rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));
