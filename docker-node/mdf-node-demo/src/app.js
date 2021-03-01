// node server 测试多进程启动

const http = require('http');
const dayjs = require('dayjs');

http.createServer(function (req, res){
  res.writeHead(200,{
    "content-type":"text/plain"
  });

  res.write("hello world, " + dayjs().format('YYYY-MM-DD'));
  res.end();
}).listen(9000, function() {
  console.log('server listen 9000');
});


function onSignal() {
  process.exit(0);
}

process.once('SIGINT', onSignal);

process.on('SIGTERM', onSignal);

process.on('SIGQUIT', onSignal);
