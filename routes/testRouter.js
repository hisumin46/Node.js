const express = require("express");
const router = express.Router();
const child_process = require('child_process');


router.get('/', (req, res) => {
  res.render("index");
});

router.post("/command-who", (req, res) => {
  // requset 에서 json 정보 가져오기
  const body = req.body;
  const command = body.command;
  
  // command 실행
  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error}`);
      console.error(`stderr: ${stderr}`);
      res.status(500).json({ error: '명령 실행 중 에러 발생' });
    } else {
      console.log(`command result: ${stdout}`);
      res.json({ result: stdout });
    }
  });
});

router.post("/command-ls", (req, res) => {
  // requset 에서 json 정보 가져오기
  const body = req.body;
  const command = body.command;
  console.log(typeof(command));
  
  // command 실행
  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error}`);
      console.error(`stderr: ${stderr}`);
      res.status(500).json({ error: '명령 실행 중 에러 발생' });
    } else {
      console.log(`command result: ${stdout}`);
      res.json({ result: stdout });
    }
  });
});

module.exports = router;