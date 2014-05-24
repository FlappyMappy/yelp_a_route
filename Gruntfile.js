'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
    
        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist'],

        copy: {
            all: {
                expand: true,
                cwd: 'app/',
                src: ['*.css', '*.html', '/iamges/**/*', '!Gruntfile.js'],
                dest: 'dist/',
                flatten: true,
                filter: 'isFile'
            }
        },

        browserify: {
            all: {
                src: 'app/*.js',
                dest: 'dist/app.js'
            },
            options: {
                transform: ['debowerify'],
                debug: true
            }
        },


        watch: {
            options: {
                livereload: true
            },

            html: {
                files: '<%= copy.all.src %>'
            },

            js: {
                files: '<%= browserify.all.src %>',
                tasks: ['browserify']
            },

            assets: {
                files: ['*.css', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
                tasks: ['copy']
            }
        },

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
        }

    });

    grunt.registerTask('server', ['express:dev', 'build', 'watch']);
    grunt.registerTask('serve', ['server']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['clean', 'browserify', 'copy']);
    
};