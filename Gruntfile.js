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
                src: ['*.css', '*.html', 'images/**/*', '!Gruntfile.js'],
                dest: 'dist/',
                flatten: true,
                filter: 'isFile'
            }
        },

        browserify: {
            standalone: {
                src: 'app/*.js',
                dest: 'dist/app.js'
            },
            test: {
                src: ['test/front-end/unit/**/*.js'],
                dest: 'test/front-end/test-suite.js',
            },
            options: {
                transform: ['debowerify', 'hbsfy'],
                debug: true
            }
        },
        simplemocha: {
            all: 'test/front-end/test-suite.js'
        },

        watch: {
            options: {
                livereload: true
            },

            html: {
                files: ['app/*.html', 'app/*.css'],
                tasks: ['copy']
            },

            js: {
                files: '<%= browserify.all.src %>',
                tasks: ['browserify']
            },

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
    grunt.registerTask('test', ['browserify:test', 'simplemocha', 'jshint']);
    grunt.registerTask('build', ['clean', 'browserify', 'copy']);

};
