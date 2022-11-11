#!/usr/bin/env node

// ** Here is some notes about basics of NodeJS

// !! Node Arguments !!

// exports - Equivalent to 'module.exports'. We can technically export code using this, but it is easier to use 'module.exports' because of a little corner case.

// require - Function to get access to the exports from another file

// module - Object that defines some properties + information about the current fil

// __filename - Full path + file name of this file

// __dirname - Full path of this file

// console.log(arguments);
// console.log(require.cache);

// const counterObject = require('./myScript');

// console.log(counterObject.getCounter()); // 0
// counterObject.incrementCounter();
// console.log(counterObject.getCounter()); // 0 1

// const newCounterObject = require('./myScript');

// // It's going to invoke getCounter function from the require cache, not from the myScript.js as first time it requires.
// console.log(newCounterObject.getCounter()); // 0 1 1

//  !! Debugging NodeJS !!

// > node inspect index.js
// Start up a debugger CLI and pause execution whenever a 'debugger' statement is hit.

// > node --inspect index.js
// Start up a debugger instance and pause execution whenever a 'debugger' statement is hit. Access the debugger at 'chrome://inspect'.

// > node --inspect-brk index.js
// Start up a debugger instance and wait to execute until a debugger is connected. Access the debugger at 'chrome://inspect'.

// * CLI Debugger Commands

// c -> Continue execution until program ends or next debugger statement
// n -> Run the next line of code
// s -> Step in to a function
// o -> Step out of the current function
// repl -> Start up an execution environment where we can reference the different variables inside of our program.

// ----------------------------------------------
// *** HERE IS WHERE THE NODE CLI PROJECT STARTS ***
// https://nodejs.org/api/fs.html#fsreaddirpath-options-callback

const fs = require('fs');

// fs.readdir(path[, options], callback)
fs.readdir(process.cwd(), (err, filenames) => {
  // EITHER
  // err === an error object
  // OR
  // err === null, which means everything is OK

  if (err) {
    console.log(err);
  }

  // console.log(filenames);

  const allStats = Array(filenames.length).fill(null);

  for (let filename of filenames) {
    fs.lstat(filename, (err, stats) => {
      const index = filenames.indexOf(filename);
      if (err) {
        console.log(err);
      }
      allStats[index] = stats;

      // 'every' function is built into every single array
      // if we call 'every' we can pass in an  iterator function
      const ready = allStats.every((stats) => {
        // We're trying to see if any value inside of allStats is equal to null
        return stats;
        // So, if it ever return null, that means that the every statement is going to overall evaluate to false
      });

      if (ready) {
        allStats.forEach((stats, index) => {
          // The reason that we're pulling out the 'index' as an argument is so we can go back into the 'filenames' array and pull out the original 'filename'
          console.log(filenames[index], stats.isFile());
        });
      }
    });
    // *!* It is not the ideal way, because if we ever decide to add in some additional async call, or as we start to add in any additional complexity, it gets too confusing
  }
});

// 1) Create package.json file with 'bin' section
// 2) Change index.js file permissions // chmod +x index.js
// 3) Add comment to index.js file to allow it to be treated like an executable // !#/usr/bin/env node
// 4) Link our project

// fs.lstat(path[, options], callback)
// lstat is used to get some information about one single file or folder at a time
// we can use stats object to determine whether or not the given thing is a file or folder
