module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            options: {
                configFile: '.eslintrc.json'
            },
            target: ['*.js']
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: './css/*.css'
        },
        htmlhint: {
            options: {
                htmlhintrc: '.htmlhintrc'
            },
            src: '*.html'
        },
        concat: {
            js: {
                src: ['*.js'],
                dest: 'dist/bundle.js'
            },
            css: {
                src: ['css/*.css'],
                dest: 'dist/bundle.css'
            }
        },
        usemin: {
            html: ['dist/index.html']
        },
        copy: {
            html: {
                src: './index.html',
                dest: './dist/index.html'
            }
        },
        uglify: {
            'dist/bundle.min.js': 'dist/bundle.js'
        },
        cssmin: {
            'dist/bundle.min.css': 'dist/bundle.css'
        },
        htmlmin: {
            options: {
                collapseWhitespace: true,
                preserveLineBreaks: false
            },
            files: {
                src: 'dist/index.html',
                dest: 'dist/index.html'
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('lint', ['htmlhint', 'csslint','eslint']);
    grunt.registerTask('build', ['copy:html','useminPrepare','concat','uglify', 'cssmin','usemin',  'htmlmin']);

};