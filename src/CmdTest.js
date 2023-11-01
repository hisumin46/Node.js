const $btn = document.querySelector("#whoBtn");
console.log(document);
console.log($btn);

$btn.addEventListener("click", (e) => {
  // command 실행 요청
  fetch("/test/command", {
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