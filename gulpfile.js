// main
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var _ = require('underscore');

// less processer
var less = require('gulp-less');

// JS system
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// system helpers
var exec = require('child_process').exec;
var sys = require('sys');
var path = require('path');

// Where do you store your Sass files?
var lessDir = 'source/components/less';

// Which directory should Sass compile to?
var targetCSSDir = 'source/components/source/css';

// Where do you store your JS files?
var style = [];
var config = {
    concat:[
        'source/components/source/css/bootstrap.css',
        'source/components/source/css/font-awesome.css',
        'source/components/assets/vendor/nprogress/nprogress.css',
        'assets/vendor/highlightjs/styles/github.css',
        'source/components/source/css/style.css'
    ],
    css:{
        bootstrap:[
            'source/components/assets/vendor/bootstrap/less/bootstrap.less'
        ],
        font:[
            'source/components/assets/vendor/font-awesome/less/font-awesome.less'
        ],
        main:[
            'source/components/less/style.less'
        ]
    },
    javascript:{
        header: [ // please do no add files here as it will mess up everything
            'source/components/assets/vendor/html5shiv/dist/html5shiv.js',
            'source/components/assets/vendor/respond/dest/respond.min.js'
        ],
        vendors: [ // it is assumed that jQuery is loaded before this file
            'source/components/assets/vendor/underscore/underscore-min.js',
            'source/components/assets/vendor/bootstrap/dist/js/bootstrap.min.js',
            'source/components/assets/vendor/nprogress/nprogress.js',
            'source/components/assets/vendor/highlightjs/highlight.pack.js'
        ],
        application: [ // it is assumed that jQuery is loaded before this file
            'source/components/js/site.js'
        ]
    }
};

// Compile Sass, autoprefix CSS3,
// and save to target CSS directory
gulp.task('css', function () {
        _.each(config.css, function (element, index) {
            gulp.src(element)
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ],
                    compress: true
                }))
                .pipe(gulp.dest(targetCSSDir))
                .pipe(notify('CSS minified'));
        });
});
gulp.task('concat', ['css'],function () {
        gulp.src(config.concat)
            .pipe(concat("site.css"))
            .pipe(gulp.dest(targetCSSDir));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
        var targetJSDir = 'source/components/source/javascript';
        _.each(config.javascript, function (element, index) {
            gulp.src(element)
                .pipe(concat(index + '.js'))
                .pipe(gulp.dest(targetJSDir))
                .pipe(rename(index + '.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest(targetJSDir));
        });
});

// Keep an eye on Less and JS files for changes...
gulp.task('watch', function () {
    //gulp.watch(lessDir + '/**/*.less', ['css']);
    //gulp.watch(jsPaths.application, ['scripts']);
});

// What tasks does running gulp trigger?
gulp.task('default', ['css', 'concat', 'scripts']); //, 'scripts', 'watch'