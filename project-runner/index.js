#!/usr/bin/env node

// ! First things to do:
// ! Writing <npm link> on this project's directory terminal

// If you are on macOS or linux based operator system you need to run the code below:
// chmod +x index.js
// chmod +x on a file (your script) only means, that you'll make it executable.

// -----------------------------

// !! Big Issues !!

// 1) Need to detect if a file changes,
// 2) It would be nice to provide some help to users of our CLI tool,
// 3) Need to figure out how to execute some JS code from within a JS program.

// !! Solutions: !!
// 1) Use a package called 'chokidar' to detect file changes,
// 2) Use a package called 'caporal' to build our CLI tool,
// 3) Use the standard library module 'child_process' to execute program

// http://nodejs.org/api
// https://nodejs.org/api/child_process.html

// Chokidar -> https://www.npmjs.com/package/chokidar

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');

// - Angle brackets "<name>" means you need to provide that value.
// - Square brackets "[name]" means that value is optional.

program
  .version('1.0.0')
  .argument('[filename]', 'Name of a file to execute')
  .action((args) => {
    console.log(args);
  });

program.parse(process.argv);

// const start = debounce(() => {
//   console.log('STARTING USERS PROGRAM');
// }, 100);

// chokidar
//   .watch('.')
//   .on('add', start)
//   .on('change', () => console.log('FILE CHANGED'))
//   .on('unlink', () => console.log('FILE UNLINKED '));

// watchit --help
// OR
// watch -h
// will show a manual documentation for watchit command
