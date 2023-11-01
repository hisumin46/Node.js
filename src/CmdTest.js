const $whoBtn = document.querySelector("#whoBtn");
const $lsBtn = document.querySelector("#lsBtn");

$whoBtn.addEventListener("click", (e) => {
  // command 실행 요청
  fetch("/test/command-who", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    "command": "who"
  }),
}).then((response) => response.json()) // 요청 후 받음
  .then((data) => {
    console.log(data);
    const who = data.result.split(" ")[0];
    const $input = document.querySelector("#whoInput");
    $input.value= who;
  }).catch((err) => console.error(new Error(err)))
});

$lsBtn.addEventListener("click", (e) => {
  // command 실행 요청
  fetch("/test/command-ls", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    "command": "ls"
  }),
}).then((response) => response.json()) // 요청 후 받음
  .then((data) => {
    const ls = data.result.split("\n");
    const $input = document.querySelector("#lsInput");
    $input.value = ls.map(e => `${e}\n`).join("");
  }).catch((err) => console.error(new Error(err)))
});