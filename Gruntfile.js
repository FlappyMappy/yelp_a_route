'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
    
        jshint: {
          options: {
            jshintrc: true
          },
          all: ['Gruntfile.js', 'server.js', 'app/*.js']
        },

        express: {
            dev: {
                options: {
                    background: true,
                    script: 'server.js'
                }
            }
        },

        watch: {
            epxress: {
                files: ['server.js'],
                task: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },

    });

    grunt.registerTask('server', ['express:dev', 'watch']);
    grunt.registerTask('serve', ['server']);
    grunt.registerTask('test', ['jshint']);
    
};