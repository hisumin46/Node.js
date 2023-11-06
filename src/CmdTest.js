const $whoBtn = document.querySelector("#whoBtn");
const $lsBtn = document.querySelector("#lsBtn");
const $pingBtn = document.querySelector("#pingBtn");

$whoBtn.addEventListener("click", (e) => {
  // command 실행 요청
  fetch("/command-who", {
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
  fetch("/command-ls", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    "command": "ls"
  }),
}).then((response) => response.json()) // 요청 후 받음
  .then((data) => {
    console.log(data);
    const ls = data.result.split("\n");
    const $input = document.querySelector("#lsInput");
    $input.value = ls.map(e => `${e}\n`).join("");
  }).catch((err) => console.error(new Error(err)))
});


// WebSocket
const ws = new WebSocket(`ws://${window.location.host}`);
const $input = document.querySelector("#pingInput")

ws.addEventListener('message', (event) => {
  console.log("서버로 부터의 메시지 : ", event.data);
  const message = event.data;
  $input.value += message + "\n";
  // console.log(message);
});


$pingBtn.addEventListener("click", (e) => {
  const message = "ping google.com";
  ws.send(message);
});