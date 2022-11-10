const message = require('./myScript');

console.log(message);

// !! Node Arguments !!

// exports - Equivalent to 'module.exports'. We can technically export code using this, but it is easier to use 'module.exports' because of a little corner case.

// require - Function to get access to the exports from another file

// module - Object that defines some properties + information about the current fil

// __filename - Full path + file name of this file

// __dirname - Full path of this file

console.log(arguments);
