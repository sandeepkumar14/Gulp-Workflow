/* jshint esnext: true*/
//««««««««««««««««««««
// Required Modules 
//««««««««««««««««««««
var gulp= require('gulp');
var concat= require('gulp-concat');
var sass= require('gulp-sass');
var uglify= require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var plumber= require('gulp-plumber');
var browserSync = require('browser-sync').create();
var autoprefixer= require('gulp-autoprefixer'); 
var reload = browserSync.reload;
var del = require('del');


//////////////////////////////////////////////////////////
/* «««««««««««««««« DEVELOPMENT ««««««««««««««««««««««««*/
//////////////////////////////////////////////////////////

// SASS Task
//««««««««««««««««««««««««««««
var sassSrc = ['./components/sass/style.scss'];
var sassDest = './development/css/';
// Task
gulp.task('sass', function(){
   return gulp.src(sassSrc)
      .pipe(sourcemaps.init({loadMaps: true, debug: true, identityMap: true}))
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
      .pipe(autoprefixer({
        browser: ['last 2 versions'],
        cascade: false
      }))
      .pipe(sourcemaps.write('../maps/css/'))
      .pipe(gulp.dest(sassDest))
      .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
      .pipe(reload({stream:true}));
});


// gulp HTML task
//««««««««««««««««««««
var htmlSrc = './development/index.html';
// Task
gulp.task('html', function(){
  gulp.src(htmlSrc)
  .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
  .pipe(reload({stream:true}));
});

/* Custom Javascript files Concatenation */
/*««««««««««««««««««««««««««««««««««««««««««««««««*/
var jsSrc= [
  "./components/javascript/sample1.js",
  "./components/javascript/sample2.js",
];
var jsDest = "./development/javascript/";

//Task
gulp.task('concatJs', function(){
   gulp.src(jsSrc)
    .pipe(sourcemaps.init())   // source maps
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(concat('script.js'))
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))  
    .pipe(sourcemaps.write('../maps/js/')) 
    .pipe(gulp.dest(jsDest))
    .pipe(reload({stream:true}));
});

/* Concatenation of all javascript Libraries */
/*««««««««««««««««««««««««««««««««««««««««««««««««*/
// javaScript Libraries Path
var libSrc= [ 
    './components/lib/angular/angular.js', 
    './components/lib/angular-resource/angular-resource.js',
    './components/lib/angular-route/angular-route.js',
    './components/lib/jquery/index.js', 
    './components/lib/jquery-migrate/index.js',
    './components/lib/bootstrap/dist/js/bootstrap.js',
    './components/lib/jquery.easing/index.js',
    './components/lib/jquery.compatibility/index.js',
];
var libDest = './development/lib/js/'; 

//Task
gulp.task('concatLibs', function(){
  gulp.src(libSrc)
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(concat('libraries.js'))
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(gulp.dest(libDest));
});

// Concatenation of all the CSS Libraries (for Development)
//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// CSS Libraries Minified files path
var libCssSrc = [
    './components/lib/bootstrap/dist/css/bootstrap.css'
];
var libCssDest = './development/lib/css/';
//Task
gulp.task('concatCssLibs', function(){
   gulp.src(libCssSrc)
     .pipe(concat('libraries.css'))
     .pipe(gulp.dest(libCssDest));
});


//««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// DELETE task  (Clean production and some development contents )
//««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
gulp.task('clean', function () {
  return del ([
    './production/',
    './development/css/**',
    './development/javascript/**',
    './development/lib/**',
    './development/maps/',
    // 'components/lib/'
  ]);
 
});

//////////////////////////////////////////////////////////
/* «««««««««««««««« PRODUCTION ««««««««««««««««««««««««*/
//////////////////////////////////////////////////////////


// Javascript Uglify Task (for production)
//«««««««««««««««««««««««««««««
// File Paths
var js2uglify = ['./development/javascript/script.js'];
var uglyJsDest = './production/javascript/';
// Task
gulp.task('uglifyJs', function(){
   gulp.src(js2uglify)
   .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
     .pipe(uglify())
     .pipe(gulp.dest(uglyJsDest));  
});


// Concatenation of all the minifies javaScripts (for production)
//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// JS Libraries Minified files path
var libMinSrc = [
    './components/lib/angular/angular.min.js', 
    './components/lib/angular-resource/angular-resource.min.js',
    './components/lib/angular-route/angular-route.min.js',
    './components/lib/jquery_min/index.js',
    './components/lib/jquery-migrate_min/index.js',
    './components/lib/bootstrap/dist/js/bootstrap.min.js',
    './components/lib/jquery.easing/index.js',
    './components/lib/jquery.compatibility/index.js',
];
var libMinDest = './production/lib/js';
//Task
gulp.task('concatMinLibs', function(){
  gulp.src(libMinSrc)
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(concat('libraries.js'))
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(gulp.dest(libMinDest));
});


// Concatenation of all the minifies CSS Libraries (for production)
//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// CSS Libraries Minified files path
var libMinCssSrc = [
    './components/lib/bootstrap/dist/css/bootstrap.min.css'
];
var libMinCssDest = './production/lib/css/';
//Task
gulp.task('concatMinCssLibs', function(){
   gulp.src(libMinCssSrc)
     .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
     .pipe(concat('libraries.css'))
     .pipe(gulp.dest(libMinCssDest));
});


// gulp minify CSS (for Production)
//««««««««««««««««««««««««««««««««««
var cssSrc = 'development/css/style.css';
var cssDest = 'production/css/';
//Task
gulp.task('minifyCss', function(){
  return gulp.src(cssSrc)
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssDest));
});


// Minify HTML task
//««««««««««««««««««««
var htmlSrc = ['./development/index.html'];
var htmlDest = './production';
// Task
gulp.task('minifyHTML', function(){
  return gulp.src(htmlSrc)
  .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
  .pipe(htmlmin({collapseWhitespace: true, comment: true}))
  .pipe(gulp.dest(htmlDest));
});



//////////////////////////////////////////////////////////
/* ««««««««««««««« BROWSER SYNC (SERVER) «««««««««««««««*/
//////////////////////////////////////////////////////////

// Browser Sync task (Development)
//«««««««««««««««««««««««««««««««««
gulp.task('serverDev', function() {
    browserSync.init({
        server: {
            baseDir: "./development"
        }
    });
});

//««««««««««««««««««««««««««««««««««
// Browser Sync task  (Production)
//««««««««««««««««««««««««««««««««««
gulp.task('serverProd', function() {
    browserSync.init({
        server: {
            baseDir: "./production"
        }
    });
});


//////////////////////////////////////////////////////////
/* «««««««««««««««« WATCH & DEFAULT TASK««««««««««««««««*/
//////////////////////////////////////////////////////////

// gulp Watch task
//««««««««««««««««««««
gulp.task('watch', function(){
  gulp.watch('./components/javascript/**/*.js', ['concatJs']);
  gulp.watch('./components/sass/**/*.scss', ['sass']);
  gulp.watch('./development/**/*.html', ['html']);
  //gulp.watch('./gulpfile.js', ['default']);
});


// gulp Default task
//««««««««««««««««««««
gulp.task('default', ['sass', 'html', 'concatJs', 'concatLibs', 'concatCssLibs', 'watch', 'serverDev']);

gulp.task('production', ['uglifyJs', 'concatMinLibs', 'minifyCss', 'concatMinCssLibs', 'minifyHTML', 'serverProd']);

/*  */
/*««««««««««««««««««««««««««««««««««««««««««««««««*/



















