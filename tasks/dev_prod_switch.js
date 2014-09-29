/*
 * grunt-dev-prod-switch
 * https://github.com/boriscougar/grunt-dev-prod-switch
 *
 * Copyright (c) 2013 Boris Aguilar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('devProdSwitch', 'Use to switch between previously defined HTML comment blocks in project files to change environment from development to production and back.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();
        var blockingChar = ((options.envChar) ? options.envChar : '#');
        var envProd = (options.envBlockProd) ? options.envBlockProd : 'env:prod';
        var envDev = (options.envBlockDev) ? options.envBlockDev : 'env:dev';

        // Iterate over all specified files.
        this.files.forEach(function (f) {
            var out = f.src.map(function (src) {
                var result;
                var innerregex;
                var innerregex2;
                if (options.environment === 'dev') {
                    innerregex = '(?!(<!-- ' + envProd + ' -->))';
                    innerregex2 = '(?!(/\\* ' + envProd + ' \\*/))';
                    var regexpprod = new RegExp('<!-- ' + envProd + ' -->' +
                                            '((' + innerregex + ')(.|\n|\r)(' + innerregex + '))*' +
                                            '<!-- ' + envProd + ':end -->' +
                                            '|' +
                                            '/\\* ' + envProd + ' \\*/' +
                                            '((' + innerregex2 + ')(.|\n|\r)(' + innerregex2 + '))*' +
                                            '/\\* ' + envProd + ':end \\*/', 'g');
                    result = grunt.file.read(src, 'utf8')
                        .replace(regexpprod, '')
                        .replace(new RegExp('<!-- ' + envDev + ' -->', 'g'), '')
                        .replace(new RegExp('<!-- ' + envDev + ':end -->', 'g'), '')
                        .replace(new RegExp('/* ' + envDev + ' */', 'g'), '')
                        .replace(new RegExp('/* ' + envDev + ':end */', 'g'), '');
                } else if (options.environment === 'prod') {
                    innerregex = '(?!(<!-- ' + envDev + ' -->))';
                    innerregex2 = '(?!(/\\* ' + envDev + ' \\*/))';
                    var regexpdev = new RegExp('<!-- ' + envDev + ' -->' +
                                            '((' + innerregex + ')(.|\n|\r)(' + innerregex +'))*' +
                                            '<!-- ' + envDev + ':end -->' +
                                            '|' +
                                            '/\\* ' + envDev + ' \\*/' +
                                            '((' + innerregex2 + ')(.|\n|\r)(' + innerregex2 +'))*' +
                                            '/\\* ' + envDev + ':end \\*/', 'g');
                    result = grunt.file.read(src, 'utf8')
                        .replace(regexpdev, '')
                        .replace(new RegExp('<!-- ' + envProd + ' -->', 'g'), '')
                        .replace(new RegExp('<!-- ' + envProd + ':end -->', 'g'), '')
                        .replace(new RegExp('/* ' + envProd + ' */', 'g'), '')
                        .replace(new RegExp('/* ' + envProd + ':end */', 'g'), '');
                } else {
                    grunt.log.writeln('Please set "environment" in options object.');
                }
                return result;
            });

            var env = (options.environment === 'prod') ? 'Production' : 'Development';
            grunt.log.writeln('Data in file "' + f.dest + '" switched to "' + env + '".');

            out = out.join("");
            grunt.file.write(f.dest, out);
        });

    });
};
