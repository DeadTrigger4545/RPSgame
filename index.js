const scoreboard = document.querySelector(".scoreboard");
const com_score = document.querySelector("#com_score");
const user_sco = document.querySelector("#user_score");
//
const gamescreen = document.querySelector(".gamescreen");
//
const rules_btn = document.querySelector("#rules_btn");
const next_btn = document.querySelector(".next_btn");
//
const rules_modal = document.querySelector("#rules_modal");
const close = document.querySelector(".close");
//
const result = document.querySelector(".result");
const user_pick = document.querySelector("#user_pick");
const result_win_heading = document.querySelector(".result_win_heading");
const com_pick = document.querySelector("#com_pick");
//
const hurray = document.querySelector(".hurray");
//

let scores = {
  user: 0,
  pc: 0,
};
// Update scores from local storage on page load
window.onload = () => {
  if (localStorage.getItem("scores")) {
    scores = JSON.parse(localStorage.getItem("scores"));
    com_score.innerHTML = scores.pc;
    user_sco.innerHTML = scores.user;
  }
};

// Display rules button
function rules(action) {
  action === "show"
    ? (rules_modal.style.display = "block")
    : (rules_modal.style.display = "none");
}

const arr = ["rock", "paper", "scissor"]; // pc choice
// Game start
function startGame(userpicked) {
  const pcPicked = arr[Math.floor(Math.random() * 3)]; //  pc choice

  gamescreen.style.display = "none";
  result.style.display = "flex";

  //  User win

  if (
    (userpicked === "rock" && pcPicked === "scissor") ||
    (userpicked === "paper" && pcPicked === "rock") ||
    (userpicked === "scissor" && pcPicked === "paper")
  ) {
    result_win_heading.innerHTML = "YOU WON!";
    user_pick.src = userpicked + ".png";
    com_pick.src = pcPicked + ".png";

    userpicked === "paper"
      ? user_pick.classList.add(userpicked + "_img_result")
      : user_pick.classList.add(userpicked + "_img");
    pcPicked === "paper"
      ? com_pick.classList.add(pcPicked + "_img_result")
      : com_pick.classList.add(pcPicked + "_img");

    user_sco.innerHTML = ++scores.user;
  } else if (userpicked === pcPicked) {
    // Tie Up

    result_win_heading.innerHTML = "TIE UP!";
    user_pick.src = userpicked + ".png";
    com_pick.src = pcPicked + ".png";

    if (userpicked === "paper") {
      user_pick.classList.add(userpicked + "_img_result");
      com_pick.classList.add(pcPicked + "_img_result");
    } else {
      user_pick.classList.add(userpicked + "_img");
      com_pick.classList.add(pcPicked + "_img");
    }
  } else {
    // PC win

    result_win_heading.innerHTML = "YOU LOST!";
    user_pick.src = userpicked + ".png";
    com_pick.src = pcPicked + ".png";

    userpicked === "paper"
      ? user_pick.classList.add(userpicked + "_img_result")
      : user_pick.classList.add(userpicked + "_img");
    pcPicked === "paper"
      ? com_pick.classList.add(pcPicked + "_img_result")
      : com_pick.classList.add(pcPicked + "_img");

    com_score.innerHTML = ++scores.pc;
  }
  //  Display next button
  scores.user > scores.pc
    ? (next_btn.style.display = "inline-block")
    : (next_btn.style.display = "none");

  // Saving scores in local storage
  localStorage.setItem("scores", JSON.stringify(scores));
  console.log(localStorage.getItem("scores"));
}

function playAgain() {
  result.style.display = "none";
  hurray.style.display = "none";
  scoreboard.style.display = "flex";
  gamescreen.style.display = "block";
}

function showHurray() {
  scoreboard.style.display = "none";
  gamescreen.style.display = "none";
  result.style.display = "none";
  next_btn.style.display = "none";
  rules_btn.style.display = "block";
  hurray.style.display = "flex";
}
