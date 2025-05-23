let x = 10;
let y = 20;

let z = x + y;

// node --print-bytecode test.js => get bytecode of the file

function memoryUsage(){
    const mbUsed = process.memoryUsage().heapUsed / 1024 / 1024
    console.log(`Memory used: ${mbUsed} MB`, )
}

console.log('Before:')
memoryUsage()

const bigString = "x".repeat(10 * 1024 * 1024)
console.log('bigString:', bigString)

console.log('After:')
memoryUsage()

// get stack memory usage => node --v8-options | Select-String "stack-size" -Context 0,1 
