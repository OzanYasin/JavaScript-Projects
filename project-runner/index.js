#!/usr/bin/env node

// -----------------------------

// !! Big Issues !!

// 1) Need to detect if a file changes,
// 2) It would be nice to provide some help to users of our CLI tool,
// 3) Need to figure out how to execute some JS code from within a JS program.

// !! Solutions: !!
// 1) Use a package called 'chokidar' to detect file changes,
// 2) Use a package called 'caporal' to build our CLI tool,
// 3) Use the standard library module 'child_process' to execute program

// -----------------------------

// http://nodejs.org/api
// https://nodejs.org/api/child_process.html

const debounce = require('lodash.debounce'); // https://lodash.com/docs/4.17.15#debounce
const chokidar = require('chokidar'); // https://www.npmjs.com/package/chokidar
const program = require('caporal'); // https://caporal.io/guide/
const fs = require('fs');
const { access } = fs.promises;
const { spawn } = require('child_process');

// - Angle brackets "<name>" means you need to provide that value.
// - Square brackets "[name]" means that value is optional.

program
  .version('1.0.0')
  .argument('[filename]', 'Name of a file to execute')
  .action(async ({ filename }) => {
    const name = filename || 'index.js';
    // We can you fs.access to check and see weather or not a file exist on the hard drive.
    // Default behavior just to check if the file event exist.
    try {
      await access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      // The child_process.spawn() method spawns a new process using the given command, with command-line arguments in args. If omitted, args defaults to an empty array.
      proc = spawn('node', [name], { stdio: 'inherit' });
      // 'standard in/out inherit' says that whenever we create this child process, whatever logs, errors, or whatever else get emitted, take that information and pass it through to our programs console log
      // If we remove <stdio: 'inherit'> option we can not see any logs on terminal because we are no longer forwarding that output information back over to our terminal.
    }, 100);

    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

program.parse(process.argv);

// watchit --help
// OR
// watch -h
// will show a manual documentation for watchit command
