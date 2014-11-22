var request     = require('request');
var duplex      = require('duplex');
exports         = module.exports;

var config = {
  'repo'       : null,
  'useragent'  : null,
  'accesstoken': null
};

exports.setConfig = function(_config) {
  config.repo        = _config.repo;
  config.useragent   = _config.useragent;
  config.accesstoken = _config.accesstoken;
};

exports.fetchIssues = function(_state) {
  if (!config.useragent || !config.accesstoken) {
    return console.log('No access credentials defined');
  }

  var options = {
    url: 'https://api.github.com/repos/' + config.repo + '/issues',
    headers: {
      'User-Agent': config.useragent
    },
    qs: {
      state: _state || 'open',
      page: 1,
      access_token: config.accesstoken  // jscs:disable
    }                                   // jscs:enable
  };

  var returnStream = duplex();
  var tempStream   = duplex();
  tempStream.pause();
  tempStream.on('_data', function(issue) {
    returnStream.write(issue);
  });

  request.get(options, receiveIssues);

  return returnStream;

  function receiveIssues(err, response, body) {
    if (err) {
      return console.log(err);
    }
    parseIssues(body);

    if (response.headers.link &&
      response.headers.link.indexOf('next') !== -1) {
      options.qs.page = options.qs.page + 1;
      request.get(options, receiveIssues);
    } else {
      options.qs.page = 1;
      tempStream.resume();
    }
  }

  function parseIssues(body) {
    if (body.indexOf('API rate limit exceeded') !== -1) {
      return console.log('API rate limit exceeded');
    }

    JSON.parse(body).forEach(function(issue) {
      tempStream.write(issue);
    });
  }
};
