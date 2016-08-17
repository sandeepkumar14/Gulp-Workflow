//««««««««««««««««««««
// Required Modules 
//««««««««««««««««««««
var gulp= require('gulp');
var concat= require('gulp-concat');
var compass= require('gulp-compass');
var uglify= require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var plumber= require('gulp-plumber');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer= require('gulp-autoprefixer');
var rimraf = require('rimraf');

//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// Concatenation of all the custom javaScript files (for development)
//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
var jsSrc = [
               "./development/components/javascript/sample1.js",
               "./development/components/javascript/sample2.js",
               "./development/components/javascript/sample3.js"
            ];
var jsDest = "./development/javascript/";
//Task
gulp.task('concatJs', function(){
   gulp.src(jsSrc)
    .pipe(plumber({
        errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }}))
     .pipe(concat('script.js'))
     .on('error', function(err) {
        console.log(err);
        this.emit('end');
      })  
     .pipe(gulp.dest(jsDest))
     .pipe(reload({stream:true}));
});

//««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// Concatenation of all the javaScript libraries (for development)
//««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// javaScript Libraries Path
var libSrc= [ 
    './development/components/lib/angular/angular.js', 
    './development/components/lib/angular-resource/angular-resource.js',
    './development/components/lib/angular-route/angular-route.js',
    './development/components/lib/jquery/index.js', 
    './development/components/lib/jquery-migrate/index.js',
    './development/components/lib/bootstrap/dist/js/bootstrap.js'
];
var libDest = './development/lib/'; 
//Task
gulp.task('concatLibs', function(){
   gulp.src(libSrc)
     .pipe(concat('libraries.js'))
     .pipe(gulp.dest(libDest));
});


//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// Concatenation of all the minifies javaScripts (for production)
//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// JS Libraries Minified files path
var libMinSrc = [
    './development/components/lib/angular/angular.min.js', 
    './development/components/lib/angular-resource/angular-resource.min.js',
    './development/components/lib/angular-route/angular-route.min.js',
    './development/components/lib/jquery_min/index.js',
    './development/components/lib/jquery-migrate_min/index.js',
    './development/components/lib/bootstrap/dist/js/bootstrap.min.js'
];
var libMinDest = './production/lib/';
//Task
gulp.task('concatMinLibs', function(){
   gulp.src(libMinSrc)
     .pipe(concat('libraries.js'))
     .pipe(gulp.dest(libMinDest));
});


//««««««««««««««««««««
// gulp Default task
//««««««««««««««««««««
gulp.task('default', ['concatJs', 'concatLibs', 'concatMinLibs']);