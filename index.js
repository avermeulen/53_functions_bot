var git = require("nodegit");
var testRunner = require('./test-runner');

var cleanRepositoryDirectories = function(rootDir){

};

var checkout = function(user_name, repo_name){
    global.username = user_name;
    var github_url = "https://github.com/" + user_name + "/" + repo_name;
    return git.Clone(github_url, "repos/" + user_name);
};

//clean the repos dir
cleanRepositoryDirectories();

var the_username = "avermeulen";

//checkout a repo
checkout(the_username, "53functions")
    .then(function(repository) {
        // Work with the repository object here.
        console.log('done!');
        process.exit();
    });

//run the tests & record the results
var testDir = "./repos/" + the_username + "/test";
testRunner(testDir, function(result){

    console.log(result.root);
    //process.exit();

});


//send an email with a warning

/**
git.Clone("https://github.com/codex-academy/53functions", "repos/avermeulen").then(function(repository) {
  // Work with the repository object here.
  console.log('done!');
  process.exit();
});
*/

// Instantiate a Mocha instance.
