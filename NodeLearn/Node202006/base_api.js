const inquirer = require('inquirer')

// var questions = [{
//     type: 'input',
//     name: 'name',
//     message: "你叫什么名字?"
// }]

// inquirer.prompt(questions).then(answers => {
//     console.log(`你好 ${answers['name']}!`)
// })
console.warn('开始');

setImmediate(() => {
  console.warn('setImmediate1');
});

setTimeout(()=>{
    console.warn('setTimeout1');
})

setImmediate(() => {
  console.warn('setImmediate2');
});

setTimeout(() => {
  console.warn('setTimeout2');
});

let countdown = 1e9;

while (countdown--) {}

console.warn('结束')


