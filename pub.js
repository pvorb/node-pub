// tpl - a general purpose template cli
// (c) 2011 Paul Vorbach. Licensed under MIT.
;(function() {

var fs = require('fs');
var path = require('path');

var append = require('append');
var confdir = require('confdir');

module.exports = function (cb) {
  confdir(process.cwd(), 'pub', function(err, dir) {
    if (err)
      cb(err);
    else
      cb(null, {
        version: 'v0.0.1',
        add: exp('add', dir),
        mv:  exp('mv', dir),
        rm:  exp('rm', dir)
      });
  });
};

function exp(cmd, confdir) {
  return function (files, opt) {
    var defaultOpt = {
      cwd: process.cwd()
    };
    var confOpt;
    try {
      confOpt = JSON.parse(fs.readFileSync(path.resolve(confdir,
        'conf.json'), 'utf8'));
    } catch (e) {
      confOpt = {};
    }
    confOpt = append(defaultOpt, confOpt);
    opt = append(confOpt, opt);

    if (typeof files == 'string')
      files = [ files ];

    require(path.resolve(confdir, cmd + '.js'))(files, opt);
  };
};

}).call(this);
