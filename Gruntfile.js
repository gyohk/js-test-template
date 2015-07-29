// Gruntfile.js
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Mocha
        jasmine: {
            pivotal: {
                src: 'src/**/*.js',
                options: {
                    vendor: [
                        'node_modules/jasmine-ajax/lib/mock-ajax.js',
                        'node_modules/jasmine-jquery/vendor/jquery/jquery.js',
                        'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Load grunt mocha task
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jasmine']);
};
