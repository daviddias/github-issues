github-issues
======================================

tl;dr; A utility belt to manage and fetch github issues

# Badgers
[![NPM](https://nodei.co/npm/github-issues.png?downloads=true&stars=true)](https://nodei.co/npm/github-issues/)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/diasdavid/github-issues?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) 
[![Dependency Status](https://david-dm.org/diasdavid/github-issues.svg)](https://david-dm.org/diasdavid/github-issues)


### fetchIssues 

returns a issues stream with one issue per _data event

```javascript
var gi = require('github-issues');

var config = {
  'repo'       : 'REPO',
  'useragent'  : 'USERNAME',
  'accesstoken': 'ACCESSTOKEN'
};

gi.setConfig(config);

var issueStream = gi.fetchIssues('open|closed');

issueStream.on('_data', function (issue) {
  console.log(issue);
});
```