import json from "./quiz.json" assert { type: "json" };
console.clear();
const quiz = json.questions;

let answers = readAnswers();
const quizElem = document.querySelector("#quiz");

function saveAnswers() {
  localStorage.setItem("answers", JSON.stringify(answers));
}

function readAnswers() {
  return localStorage.getItem("answers") !== null
    ? JSON.parse(localStorage.getItem("answers"))
    : Array(10).fill(-1);
}

function inputAnswer(index, value) {
  answers[index] = value;
  saveAnswers();
}
function checkAnswers() {
  let correct = 0;
  for (let [index, val] of quiz.entries()) {
    let color = "";
    if (val.answers.indexOf(val.correctAnswer) === answers[index]) {
      color = "green";
      correct++;
    } else {
      color = "red";
    }

    if (answers[index] != -1) {
      document.querySelector(`#answer-${index}-${answers[index]}`).style.color =
        color;
    }
  }
  document.querySelector(
    "#result"
  ).innerText = `You got ${correct} answers correct`;
}
function displayQuiz() {
  for (let [index, val] of quiz.entries()) {
    quizElem.innerHTML += displayQuizItem(index, val);
  }
}
function displayQuizItem(pos, item) {
  let container = `<div class="quiz-item">`;
  container += `<h3>${item.question}</h3>`;
  for (let [index, val] of item.answers.entries()) {
    container += `<div><input type="radio" name="question-${pos}" 
    value="${index}" onclick="inputAnswer(${pos},${index})" ${
      answers[pos] === index ? "checked" : ""
    }>
     <label for="answer-${pos}-${index}" id="answer-${pos}-${index}">${val}</label></div>`;
  }
  container += `</div>`;
  return container;
}
displayQuiz();

window.checkAnswers = checkAnswers;
window.inputAnswer = inputAnswer;
