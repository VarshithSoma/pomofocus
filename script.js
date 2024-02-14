"use strict";
const body = document.querySelector("body");
const allButtons = document.querySelector(".allButtons");
const root = document.querySelector(":root");
const btns = document.querySelectorAll(".btn");
const impBtn = document.querySelector(".User-click");
const clickSound = document.getElementById("clickSound");
const labelTimer = document.querySelector(".time");
const ShortBreakEl = document.querySelector(".ShortBreak");
const Hashnumber = document.querySelector(".Hashnumber");
const btnimp = document.querySelector(".part-two");
const form = document.querySelector(".form");
const save = document.querySelector(".save");
const cancel = document.querySelector(".cancel");
const inCount = document.querySelector(".noof");
const incr = document.querySelector(".inc");
const decr = document.querySelector(".dec");
const imptext = document.querySelector(".imp");
let markupArray = [];
let rmopt = [];
var time = 25 * 60;
let noTask = 0;
let intervalId;
let count = 1;
let taskArray = [];
let task = "";
const setActiveColorScheme = (
  primaryOne,
  primaryTwo,
  primaryThree,
  primaryFour,
  primaryFive,
  activeColor,
  target
) => {
  btns.forEach((btn) => btn.classList.remove("Active"));
  root.style.setProperty("--primary-color-one", primaryOne);
  root.style.setProperty("--primary-color-two", primaryTwo);
  root.style.setProperty("--primary-color-three", primaryThree);
  root.style.setProperty("--primary-color-four", primaryFour);
  root.style.setProperty("--primary-color-five", primaryFive);
  root.style.setProperty("--Active", activeColor);
  target.classList.add("Active");
  updateTime(time);
  impBtn.textContent = "START";
  impBtn.dataset.p = "start";
};

allButtons.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("Active")) {
    return;
  }
  clearInterval(intervalId);
  if (e.target.classList.contains("ShortBreak")) {
    time = 5 * 60;
    setActiveColorScheme(
      "#38858A",
      "#4C9196",
      "#32777C",
      "#609EA2",
      "#75A5A9",
      "#417B80",
      e.target
    );
  } else if (e.target.classList.contains("LongBreak")) {
    time = 15 * 60;
    setActiveColorScheme(
      "#397097",
      "#4D7FA2",
      "#336588",
      "#618DAC",
      "#397097",
      "#426C8A",
      e.target
    );
  } else if (e.target.classList.contains("Pomodoro")) {
    time = 25 * 60;
    setActiveColorScheme(
      "#ba4949",
      "#c15c5c",
      "#a74242",
      "#c86d6d",
      "#ca8e8e",
      "#a44e4e",
      e.target
    );
  }
});

impBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clickSound.play();
  if (e.target.dataset.p === "start") {
    e.target.textContent = "PAUSE";
    e.target.dataset.p = "pause";
    timer();
  } else if (e.target.dataset.p === "pause") {
    e.target.textContent = "START";
    e.target.dataset.p = "start";
    clearInterval(intervalId);
  }
});
function timer() {
  const initialTime = time;
  intervalId = setInterval(function () {
    time--;
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time <= 0) {
      clearInterval(intervalId);
      ShortBreakEl.click();
      impBtn.textContent = "START";
      if (initialTime === 25 * 60) {
        count++;
        Hashnumber.textContent = `#${count}`;
      }
    }
  }, 1000);
}
const updateTime = function (time) {
  let min = String(Math.trunc(time / 60)).padStart(2, 0);
  let sec = String(time % 60).padStart(2, 0);
  labelTimer.textContent = `${min}:${sec}`;
};
btnimp.addEventListener("click", function () {
  btnimp.classList.add("hidden");
  form.classList.remove("hidden");
  document.querySelector(".tasks").style.marginBottom = "370px";
});
cancel.addEventListener("click", function () {
  btnimp.classList.toggle("hidden");
  form.classList.toggle("hidden");
});
inCount.addEventListener("input", function (e) {
  count = parseInt(e.target.value) || 0;
});

incr.addEventListener("click", function () {
  count++;
  inCount.value = count;
});

decr.addEventListener("click", function () {
  count = Math.max(1, count - 1); // Ensure count is never less than 1
  inCount.value = count;
});
imptext.addEventListener("input", function (e) {
  task = "";
  task = e.target.value;
});
save.addEventListener("click", function (e) {
  taskArray.push({ task, count });
  noTask++;
  document.querySelector(".tasks").style.marginBottom = "50px";
  const markup = `<div class="taskclickdone">
          <div class="div-in-tas-one">
            <div class="black"></div>
            <img src="grey-logo.png" alt="" srcset="" />
            <p class="taskName">${task}</p>
          </div>
          <div class="div-in-tas-two">
            <p class="fact">${count}</p>
            <button class="rmopt ${noTask}">
             <p>Done</p>
            </button>
          </div>
        </div>`;
  body.insertAdjacentHTML("beforeend", markup);
  markupArray.push(markup);
  form.classList.toggle("hidden");
  btnimp.classList.toggle("hidden");
  imptext.value = "";
  rmopt = document.querySelectorAll(".rmopt");
  rmopt.forEach((el) =>
    el.addEventListener("click", function (e) {
      e.target.closest(".taskclickdone").remove();
      console.log(taskArray);
      e.target.closest(".taskclickdone").remove();
      // localStorage.setItem("tasksInArray", JSON.stringify(taskArray));
    })
  );

  // localStorage.setItem("tasksInArray", JSON.stringify(taskArray));
});

// const ls = JSON.parse(localStorage.getItem("tasksInArray")) || [];
// ls.forEach((el) => {
//   const markup = `<div class="taskclickdone">
//           <div class="div-in-tas-one">
//             <div class="black"></div>
//             <img src="grey-logo.png" alt="" srcset="" />
//             <p class="taskName">${el.task}</p>
//           </div>
//           <div class="div-in-tas-two">
//             <p class="fact">${el.count}</p>
//             <button class="rmopt">
//              <p>Done</p>
//             </button>
//           </div>
//         </div>`;
//   markupArray.push(markup);
//   document
//     .querySelectorAll(".taskclickdone")
//     .forEach((el) => el.classList.add("hidden"));
//   markupArray.forEach((el) => body.insertAdjacentHTML("beforeend", el));
//   form.classList.toggle("hidden");
//   document.querySelector(".tasks").style.marginBottom = "0px";
//   document.querySelector(".tasks").style.height = "auto";
//   btnimp.classList.toggle("hidden");
//   imptext.value = "";
//   rmopt = document.querySelectorAll(".rmopt");
//   rmopt.forEach((el) =>
//     el.addEventListener("click", function (e) {
//       e.target.closest(".taskclickdone").remove();
//     })
//   );
// });
