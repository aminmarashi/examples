function memoryHog(len) {
    const bla = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (len) (() => memoryHog(len - 1, bla))();
}

memoryHog();

const readline = require("readline");

const lines = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(process.memoryUsage())
lines.prompt();
lines.on("line", (line) => {
    memoryHog(parseInt(line));
    console.log(process.memoryUsage())
    lines.prompt();
});
