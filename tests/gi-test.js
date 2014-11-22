var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();

var experiment = lab.experiment;
var test = lab.test;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var gi = require('./../src/index.js');

experiment(': ', function() {

  var credentials;

  before(function(done) {
    credentials = require('./secret.json');
    done();
  });

  after(function(done) {
    done();
  });

  test('set config', function(done) {
    var config = {
      'repo': 'diasdavid/github-issues',
      'useragent': credentials.useragent,
      'accesstoken': credentials.accesstoken
    };
    gi.setConfig(config);
    done();
  });

  test('get issues', function(done) {
    var issueStream = gi.fetchIssues('closed');
    issueStream.on('_data', function(issue) {
      done();
    });
  });
});
