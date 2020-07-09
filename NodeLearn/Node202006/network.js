const http = require('http')

const port = 1234
const hostname = 'localhost'

const server = http.createServer((req, res) => {
    console.log('我收到请求了');
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const result = {
        name: 'mochixuan',
        age: 23
    };
    // res.write('我写在你上面');
    res.end(JSON.stringify(result));
})

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})