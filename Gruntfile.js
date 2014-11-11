/*global module:false*/
module.exports = function(grunt) {

    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        watch: {
            jshint: {
                files:  [ 'app/**/*.js', 'Gruntfile.js' ],
                tasks:  [ 'jshint:all']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/**/*.js',
                'test/**/*.js'
            ]
        },
    });



  // Default task.
  grunt.registerTask('default', ['jshint']);

};
