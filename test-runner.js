var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

module.exports = function(targetDirectory, cb){

    var mocha = new Mocha({
        'reporter' : 'my-reporter',
        'delay' : true
    });

    // Add each .js file to the mocha instance
    fs.readdirSync(targetDirectory)
      .filter(function(file){
        // Only keep the .js files
        return file.substr(-3) === '.js';

        })
        .forEach(function(file){
            mocha.addFile(
                path.join(targetDirectory, file)
            );
        });

    // Run the tests.
    mocha
        .run()
        .on('end', function(done){
            //
            done();
            cb('done!');
        });

}
