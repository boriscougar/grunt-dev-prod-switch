'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.devProdSwitch = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  defaultOptions: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/developmentOptions');
    var expected = grunt.file.read('test/expected/devEnvironment');
    test.equal(actual, expected, 'Testing simple scenario of mostly dev environment with mixed production tags');

    test.done();
  },
  customOptions: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/productionOptions');
    var expected = grunt.file.read('test/expected/prodEnvironment');
    test.equal(actual, expected, 'Testing simple scenario of mostly prod environment with mixed development tags');

    test.done();
  },
};
