;(function() {
  var cp = require('child_process');
  var append = require('append');

  module.exports = function add(files, opt) {
    var defaultOpt = {
      cwd: process.cwd()
    };
    opt = append(defaultOpt, opt);

    if (typeof files == 'object' && files instanceof Array)
      files = files.join(' ');

    console.log(typeof files);
    console.log(files);

    // add file to git
    cp.exec('git checkout pub' + files, opt, function (err, stdout, stderr) {
      cp.exec('git add ' + files, opt, function (err, stdout, stderr) {
        // commit
        cp.exec('git commit ' + files, opt, function (err, stdout, stderr) {
        });
      });
    });
  };
}).call(this);
