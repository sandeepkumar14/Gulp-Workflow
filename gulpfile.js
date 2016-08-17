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

//««««««««««««««««««««
// gulp Default task
//««««««««««««««««««««
gulp.task('default', ['concatJs']);
