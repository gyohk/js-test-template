// Gruntfile.js
module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Mocha
    mocha: {
      all: {
        src: ['test/testrunner.html'],
      },
      options: {
        run: true
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // Load grunt mocha task
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['mocha']);
};