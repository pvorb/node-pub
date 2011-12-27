#!/usr/bin/env node
;(function() {

var optimist = require('optimist')
    .usage('Usage:\n'
        + 'pub add [-t|--type] [type] [--draft] [file]\n'
        + 'pub rm  [file]')
    .alias('t', 'type')
    .boolean('draft');
var argv = optimist.argv;

var cmdHelp = {
  add: 'Usage: pub add [-t|--type] [type] [--draft] [file]',
  mv:  'Usage: pub mv  [file1] [file2]',
  rm:  'Usage: pub rm  [file]'
};

console.log(argv);
var cmd = argv._.shift(); // get first arg

// Show help, if no command provided
if (argv.h || typeof cmd == 'undefined') {
  if (typeof argv.h == 'string') {
    console.log(cmdHelp[argv.h]);
  }

  console.log(optimist.help());
  return;
}

var pub = require('pub');

switch (cmd) {
  case 'add':
    pub.add(argv._, argv.t);
    break;
  case 'mv':
    pub.mv();
    break;
  case 'rm':
    pub.rm();
    break;
  default:
    break;
}

}).call(this);
