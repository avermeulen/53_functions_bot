
var MongoClient = require('mongodb').MongoClient;

module.exports = MyReporter;

var url = process.env.MONGO_URL || 'mongodb://localhost:27017/unittest_reports';



function MyReporter(runner) {
  var passes = 0;
  var failures = 0;

  var self = this;

  self.done = false;

  var testReport = {
      result : function(){
          return '%d/%d', this.data.passes, this.data.passes + this.data.failures;
      },
      report_error : function(err){
          this.data.tests.push(err);
          err.status = "failed";
          this.data.failures++;
      },
      report_pass : function (test) {
          test.status = "passed";
         this.data.passes++;
         this.data.tests.push(test);
     },
     data : {
         username : global.username,
         run_at : Date.now(),
         tests : [],
         passes : 0,
         failures : 0,
     }
  };

  runner.on('pass', function(test){
      console.log('pass')
    testReport.report_pass({
        title : test.fullTitle()
    });
  });

  runner.on('fail', function(test, err){
    var errorDetails = {
        title : test.fullTitle(),
        message : err.message
    };
    testReport.report_error(errorDetails);

  });

  runner.on('waiting', function(done){
     console.log('waiting...');
     done();
  });

  runner.on('end', function(done){

    MongoClient.connect(url, function(err, db) {
        var test_reports = db.collection('test_reports');
        test_reports
            .insertOne(testReport.data)
            .then(function(report){
                //res.send(todo);
                console.log('report created!');
                db.close();
                //indicate the reporter is done
                self.done = true;
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                db.close();
                //indicate the reporter is done
                self.done = true;

                //res.send({});
            });
    });

    //process.exit(failures);
  });
}
