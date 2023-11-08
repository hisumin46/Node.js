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


const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3000;
// const socketIo = require('socket.io'); // npm install socket.io
const WebSocket = require('ws'); // npm install express ws
const server = http.createServer(app);
const cors = require('cors');
const child_process = require('child_process');


app.set('view engine', 'ejs'); // 템플릿 엔진 설정
app.set('views', path.join(__dirname, 'views')); // view 파일 폴더 지정

// 정적파일 설정
// __dirname 는 절대경로
// app.use('/static', express.static('public')); // 가상경로 설정
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src")));

// json 사용
app.use(bodyParser.json());
// CORS 미들웨어를 사용하여 모든 경로에 대해 CORS를 허용
app.use(cors());

// 라우팅 설정
const testRouter = require("./routes/testRouter");
app.use("/", testRouter);

// Web Socket
// 이미 생성된 HTTP 서버(server)를 WebSocket 서버로 업그레이드
// HTTP 서버와 WebSocket 서버를 통합하고 같은 포트를 사용하여 통신
// const wss = new WebSocket.Server({ server }); 

// 서버 자체에서 WebSocket 서버를 독립적으로 열고 사용
const wss = new WebSocket.WebSocketServer({ port:3001 });
wss.on('connection', (ws) => {
  console.log('Connecting web socket');

  ws.on("message", (message) => {
    // ping을 실행하고 결과를 스트리밍 형식으로 클라이언트로 보내기
    const pingProcess = child_process.spawn('ping', ['google.com']);
    pingProcess.stdout.on('data', (data) => {
      const resultLine = data.toString();
      ws.send(resultLine); // 클라이언트로 결과를 전송
    });
  });
});

// epxress는 기본적으로 웹소켓을 지원하지 않기에 http 모듈 사용
// 소켓 사용을 위해 http server로 열기
// 서버 실행 
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});