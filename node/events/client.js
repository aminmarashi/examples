const ws = require('ws');

const connection = new ws(`${process.env.SCHEME || 'ws'}://${process.env.HOST || 'localhost'}:${process.env.PORT || 8080}`);

connection.onmessage = function(msg) {
    console.log(`\n< ${msg.data}`)
    lines.prompt();
}

const readline = require('readline');
const { exit } = require('process');

const lines = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
})

lines.prompt();

lines.on('line', line => {
    connection.send(line);
    lines.prompt();
})

connection.on('close', () => {
    console.log('Disconnected, exiting...');
    exit(0);
})