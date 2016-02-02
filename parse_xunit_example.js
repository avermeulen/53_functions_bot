var fs        = require('fs');
var XmlDoc = require('xmldoc');
/*
   * Pass the ReadStream object to xml-stream
*/


fs.readFile('./data/xunit.xml', 'utf-8',function(err, data){

    var document = new XmlDoc.XmlDocument(data);

    console.log(document.attr.failures);

    var test_cases = document.childrenNamed('testcase');
    console.log(test_cases.length);
    test_cases.forEach(function(test_case){

        if (test_case.firstChild !== null ){
            console.log(test_case.attr.name);
            //console.log(test_case.firstChild);
            console.log(test_case.firstChild.attr.message);
        //var failure = test_case;
        //console.log(failure.val);

        //if (failure.name = "failure"){
        //    console.log(failure.attr.message)
        //}
            console.log("*********");
        }
    });

});
