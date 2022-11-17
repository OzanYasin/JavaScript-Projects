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

const chokidar = require('chokidar');

chokidar
  .watch('.')
  .on('add', () => console.log('FILE ADDED'))
  .on('change', () => console.log('FILE CHANGED'))
  .on('unlink', () => console.log('FILE UNLINKED '));
