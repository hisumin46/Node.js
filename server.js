/*
const http = require("http");
// node 서버 생성 
const server = http.createServer((req, res) => {
  // respones 객체 반환
  res.writeHead(200, {"Content-Type":"text/html"});
  // 컨텐츠를 받은후 html 로 변환
  res.end("hi");
});

server.listen(3000, () => {
  console.log("3000 SErver is running");
})

*/

// 웹서버를 실행하기ㅜ이해 http 모듈을 require로 불러옴

// express 서버 열기
const express = require("express");
const app = express();
const PORT = 3000;

// 정적파일 설정
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, "public")));

// 라우팅 설정
const testRouter = require("./routes/testRouter");
app.use("/test", testRouter);
// app.get("/", (req, res) => {
//   res.seedFile(__dirname + "/index.html");
// })

// 서버 실행 
app.listen(PORT, () => {
  console.log(`SErver is running: ${PORT}`);
});