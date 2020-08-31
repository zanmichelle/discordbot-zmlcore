// const { spawn } = require('child_process');
// const { Console } = require('console');
// const logger = new Console({stdout: stdout, stderr: stdin})

// function stdout(text) {
//     console.log(text);
// }

// function stdin(text) {
//     console.log(text)
// }

// spawn("./src/zChildTest.js", [], {shell: true, detached: true});
// console.log('done');

// setInterval(() => {
//     console.log(`3 seconds has passed`);
// }, 3000);

// const {spawn} = require('child_process');
// let window = spawn(`osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'`,[]);
// window.stdin.write('THIS IS TEST');

// setInterval(() => {
//     console.log(a)
// }, 5000);




const {streamWrite, streamEnd, onExit} = require('@rauschma/stringio');
const {spawn} = require('child_process');

async function main() {
  const sink = spawn(`osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'`, [],
    {stdio: ['pipe', process.stdout, process.stderr]}); // (A)

  writeToWritable(sink.stdin); // (B)
  await onExit(sink);

  console.log('### DONE');
}
main();

async function writeToWritable(writable) {
  await streamWrite(writable, 'First line\n');
  await streamWrite(writable, 'Second line\n');
  await streamEnd(writable);
}