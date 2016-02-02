#Overview

Installing the reporter - https://www.npmjs.com/package/xunit-file

folder in jenkins is: /var/lib/jenkins/workspace

some script file to run:

`bash

npm install

if [ -d "the_tests" ]; then
	rm -rf ./the_tests/
fi

if [ ! -d "the_tests" ]; then
	cp -r ../the_tests ./the_tests
fi

./node_modules/mocha/bin/mocha ./the_tests  --reporter xunit-file

#rm -rf ./the_tests
`
