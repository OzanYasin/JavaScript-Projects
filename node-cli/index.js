#!/usr/bin/env node

// ----------------------------------------------

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
// *** THE NODE CLI PROJECT STARTS ***
// https://nodejs.org/api/fs.html#fsreaddirpath-options-callback

// 1) Create package.json file with 'bin' section
// 2) Change index.js file permissions // chmod +x index.js
// 3) Add comment to index.js file to allow it to be treated like an executable // !#/usr/bin/env node
// 4) Link our project

// fs.lstat(path[, options], callback)
// lstat is used to get some information about one single file or folder at a time
// we can use stats object to determine whether or not the given thing is a file or folder

// !! Naive Solution !!

// fs.readdir(process.cwd(), (err, filenames) => {
//   if (err) {
//     console.log(err);
//   }

//   const allStats = Array(filenames.length).fill(null);
//   for (let filename of filenames) {
//     fs.lstat(filename, (err, stats) => {
//       const index = filenames.indexOf(filename);
//       if (err) {
//         console.log(err);
//       }

//       allStats[index] = stats;

//       // 'every' function is built into every single array
//       // if we call 'every' we can pass in an  iterator function
//       const ready = allStats.every((stats) => {
//         // We're trying to see if any value inside of allStats is equal to null
//         return stats;
//         // So, if it ever return null, that means that the every statement is going to overall evaluate to false
//       });

//       if (ready) {
//         allStats.forEach((stats, index) => {
//           // The reason that we're pulling out the 'index' as an argument is so we can go back into the 'filenames' array and pull out the original 'filename'
//           console.log(filenames[index], stats.isFile());
//         });
//       }
//     });
//     // *!* It is not the ideal way, because if we ever decide to add in some additional async call, or as we start to add in any additional complexity, it gets too confusing
//   }
// });

// ---------------------------------------------------

// !! Async Solution !!

// Method #1
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };

// // Method #2
// const util = require('util');
// const lstat = util.promisify(fs.lstat);

// Method #3
// const { lstat } = fs.promises;

// fs.readdir(process.cwd(), async (err, filenames) => {
//   if (err) {
//     console.log(err);
//   }

//   for (let filename of filenames) {
//     try {
//       const stats = await lstat(filename);

//       console.log(filename, stats.isFile());
//     } catch (error) {
//       console.log(err);
//     }
//   }
// });

// ---------------------------------------------------

// !! Good Solution (Proper Way to Better Performed Async Solution) !!

// We need to use one of the methods of promised lstat variable

const fs = require('fs');
const { lstat } = fs.promises;
const path = require('path');
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statsPromise = filenames.map((filename) => {
    // path.join() going to look whatever folder we're trying to find and append on the file name to the very end
    return lstat(path.join(targetDir, filename));
  });

  // By using Promise.all(), all these different operations is processing in parallel, which means we should get way better performance any time that we try to run the stats operation on many different files at the same time.
  const allStats = await Promise.all(statsPromise);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.dim(filenames[index]));
    } else {
      console.log(chalk.bold(filenames[index]));
    }
  }
});
