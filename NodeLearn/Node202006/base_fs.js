const fs = require('fs');
const archiver = require('archiver');

function crudFile() {
    // 同步读取
    let dirs = fs.readdirSync('./node_modules');
    console.log(dirs);
    // 同步读取
    fs.readdir('./node_modules', (error, result) => {
        console.log(error)
        console.log(result);
    });

    // 创建
    fs.mkdir('./testFile', (error) => {
        console.log('错误', error);
        console.log('创建成功');
    })
    // 改名
    fs.rename('./testFile', './testFs', (error) => {
        console.log('错误', error);
    })
    // 删除文件夹：只能删除空的
    fs.rmdir('./testFs', (error) => {
        console.log('错误', error);
    })

    // 创建或覆盖记录文件
    fs.writeFile('./testFile/test.txt', '大家好', (error) => {
        console.log(error);
    })
    // 写数据
    fs.appendFile('./testFile/test.txt', '123', (error) => {

    })
    // 读数据
    fs.readFile('./testFile/test.txt', (error, data) => {
        console.log(data.toString('utf-8'));
    })
    // 删除文件
    fs.unlink('./testFile/test.txt', (error) => {

    })
}

// crudFile();

// 复制目录下文件到另一个目录下
function exists(src, dst, callback) {
    //测试某个路径下文件是否存在
    fs.exists(dst, function (exists) {
        if (exists) { //不存在
            callback(src, dst);
        } else { //存在
            fs.mkdir(dst, function () { //创建目录
                callback(src, dst)
            })
        }
    })
}

const stat = fs.stat;
function copyFile(src, dst) {
    fs.readdir(src, function(err, paths){
        if (err) {
            throw err;
        }
        paths.forEach(function(path){
            const _src = src+'/'+path;
            const _dst = dst+'/'+path;
            let readable;
            let writable;
            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }
                if (st.isFile()) {
                    readable = fs.createReadStream(_src); //创建读取流
                    writable = fs.createWriteStream(_dst); //创建写入流
                    readable.pipe(writable);
                } else if (st.isDirectory()) {
                    exists(_src, _dst, copyFile);
                }
            });
        })
    })
}

copyFile('./testFile', './testFile1')



function zipDir() {
    // archive
    const output = fs.createWriteStream('./release/release.zip');
    const archive = archiver('zip', {
        zlib: {
            level: 9
        }
    })

    output.on('close', function () {
        console.log('打包成功');
    })
    output.on('error', function (error) {
        console.log('打包失败');
        if (error.code === 'ENOENT') {
            console.warn(error);
        } else {
            throw error;
        }
    })

    archive.pipe(output);

    // archive.append('mochixuan', {name: 'file.txt'});

    archive.directory('./testFile', 'mochixuan');

    archive.finalize();
}

// zipDir();