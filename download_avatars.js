var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    json: true,
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  })
}

function downloadImageByURL(url, filePath) {
  console.log("starting", filePath);
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('end', function() {
    console.log("      ....   finished", filePath);
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  if (!owner || !repo || err) {
    console.log("Nope sorry - more params needed");
  } else {
    console.log("Got", result.length, "contributor stalker-packets, proceeding with stalking.");
    result.forEach(function (object) {
      var login = object.login;
      downloadImageByURL(repo, owner + ".jpg");
    });
  }

});



