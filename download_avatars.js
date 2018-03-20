var request = require('request');
var secrets = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Auth': 'token:' + secrets.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });

// function noData() {
//   console.log("No avatars available")
// }




}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
