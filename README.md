# grunt-dev-prod-switch

[![NPM](https://nodei.co/npm/grunt-dev-prod-switch.png)](https://nodei.co/npm/grunt-dev-prod-switch/)

> Use to switch between previously defined comment blocks in project files to change environment from development to production and back.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dev-prod-switch --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dev-prod-switch');
```

## The "devProdSwitch" task

### Overview
In your project's Gruntfile, add a section named `devProdSwitch` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    
...
    
    devProdSwitch: {
        options: {
            environment: 'dev',
            envChar: '#',
            envBlockDev: 'env:dev',
            envBlockProd: 'env:prod'
        },
        all: {
            files: {
                'app/index.html': 'app/index.html',
                'app/js/main.js': 'app/js/main.js'
            }
        }
    }
    
...
    
});
```

Or 

```js
grunt.initConfig({
    
...
    
    devProdSwitch: {
        options: {
            // Can be ran as `grunt --env=dev` or ``grunt --env=prod``
            environment: grunt.option('env') || 'dev', // 'prod' or 'dev'
            envChar: '#',
            envBlockDev: 'env:dev',
            envBlockProd: 'env:prod'
        },
        dynamicMappings: {
            files: [{
                expand: true,
                cwd: './',
                src: ['*.html'],
                dest: './'
            }]
        }
    }

...
    
});
```

In _html_ or _ColdFusion_ type of files place the code depending on environment as follows:

```
...

<!-- env:dev -->
    <h1>For devs eyes only</h1>
    <p>This will be visable in 'dev' environment</p>
<!-- env:dev:end -->


<!-- env:prod -->
    <h1>For everyone</h1>
    <p>This will be visable in 'prod' environment</p>
<!-- env:prod:end -->

...

```

In _C_, _Java_, _JavaScript_ type of files place the code depending on environment as follows:

```
...

/* env:dev */
    function add(a,b) { 
        console.log('ADD: ' + a + ' + ' + b + ' = ' + (a + b));
        return a+b;
    }
/* env:dev:end */


/* env:prod */
    function add(a,b) { 
        return a+b;
    }
/* env:prod:end */

...

```

### Using in Gulp without plug-in

```js

// Options to switch environment (dev/prod)
var envOption = {
    envDev: 'env:dev',
    envProd: 'env:prod',
    blockingChar: '#'
};

/**
 * dev
 *
 * Change environment to "development"
 * Use: gulp dev
 */
gulp.task('dev', function() {
    var files = ['./app/index.html'];
    files.forEach(function(file) {
        var content = fs.readFileSync(file, "utf8")
            .replace('<!-- ' + envOption.envDev + ' --' + envOption.blockingChar + '>', '<!-- ' + envOption.envDev + ' -->')
            .replace('<!-- ' + envOption.envProd + ' -->', '<!-- ' + envOption.envProd + ' --' + envOption.blockingChar + '>')
            .replace('/* ' + envOption.envDev + ' *' + envOption.blockingChar + '/', '/* ' + envOption.envDev + ' */')
            .replace('/* ' + envOption.envProd + ' */', '/* ' + envOption.envProd + ' *' + envOption.blockingChar + '/');
        fs.writeFileSync(file, content);
    });
});

/**
 * prod
 *
 * Change environment to "production"
 * Use: gulp prod
 */
gulp.task('prod', [], function() {
    var files = ['./app/index.html'];
    files.forEach(function(file) {
        var content = fs.readFileSync(file, "utf8")
            .replace('<!-- ' + envOption.envProd + ' --' + envOption.blockingChar + '>', '<!-- ' + envOption.envProd + ' -->')
            .replace('<!-- ' + envOption.envDev + ' -->', '<!-- ' + envOption.envDev + ' --' + envOption.blockingChar + '>')
            .replace('/* ' + envOption.envProd + ' *' + envOption.blockingChar + '/', '/* ' + envOption.envProd + ' */')
            .replace('/* ' + envOption.envDev + ' */', '/* ' + envOption.envDev + ' *' + envOption.blockingChar + '/');
        fs.writeFileSync(file, content);
    });
});
```

### Options

#### options.environment _(requered)_
Type: `String`
Default value: NONE

A string value that is used to do define the environment.

#### options.envBlockDev _(optional)_
Type: `String`
Default value: 'env:dev'

Override the default string of the comment. 
So the task will be searching for `<!-- env:dev -->` comment blocks

#### options.envBlockProd _(optional)_
Type: `String`
Default value: 'env:prod'

Override the default string of the comment. 
So the task will be searching for `<!-- env:prod -->` comment blocks


## Release History
#### 0.1.5
* Working version
* Update: jshint camel case configuration
* Fix: Correct testing cases
* Fix: Removing envChar

#### 0.1.4
* Fix: Oops, used reserved word.

#### 0.1.3
* Add: Override options
* Add: Support for files with `/* comment */` comments styles

#### 0.1.2
* It's a live
