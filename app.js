/** 노드 http 모듈도 서버 열기
// 웹서버를 실행하기 위해 http 모듈을 require로 불러옴
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


/** express 프레임워크를 이용한 서버 열기
const express = require("express");
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/name/:user_name', function(req,res) {
  res.status(200);
  res.set('Content-type', 'text/html');
  res.send('<html><body>' +
    '<h1>Hello ' + req.params.user_name + '</h1>' +
    '</body></html>'
  );
});

//loacalhost:3000/name/sumin으로 접속하면 Hello sumin이 나옴

app.listen(PORT, () => {
  console.log(`SErver is running: http://localhost:${PORT}`);
});
 */


// 정적 파일 사용
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

// 정적파일 설정
// __dirname 는 절대경로
// app.use('/static', express.static('public')); // 가상경로 설정
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src")));

// json 사용
app.use(bodyParser.json());

// 라우팅 설정
const testRouter = require("./routes/testRouter");
app.use("/test", testRouter);

// 서버 실행 
app.listen(PORT, () => {
  console.log(`SErver is running: http://localhost:${PORT}`);
});