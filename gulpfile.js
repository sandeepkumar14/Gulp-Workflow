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
var htmlmin = require('gulp-html-minifier');
// var htmlmin = require('gulp-htmlmin');
var plumber= require('gulp-plumber');
var browserSync = require('browser-sync').create();
var autoprefixer= require('gulp-autoprefixer'); 
var reload = browserSync.reload;
var del = require('del');
var imagemin = require('gulp-imagemin');
var ejs = require("gulp-ejs");
var strip = require('gulp-strip-comments');
var nodemon= require('gulp-nodemon');
var jshint = require('gulp-jshint');

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

// gulp EJS task
//««««««««««««««««««««
var ejsSrc = './views/pages/index.ejs';
var ejsDest = './development/';

gulp.task('ejs', function(){
gulp.src(ejsSrc)
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(ejs({
        msg: "EJS Task!",
        rmWhitespace: true,
        comment: false,
    },
    {ext:'.html'}))
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(gulp.dest(ejsDest))
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
  "./components/javascript/navigation.js",
  "./components/javascript/marquee.js",
  "./components/javascript/aboutme.js",
  "./components/javascript/svg-slider.js",
  "./components/javascript/tooltip.js",
  "./components/javascript/gotop.js",
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
    './components/lib/angular-route/angular-route.js',
    './components/lib/angular-animate/angular-animate.js',
    './components/lib/jquery/index.js',
    './components/lib/jquery-migrate/index.js', 
    './components/lib/modernizer/modernizer.js',
    './components/lib/bootstrap/dist/js/bootstrap.js',
    './components/lib/jquery.easing/index.js',
    './components/lib/typed.js/js/typed.js',
    './components/lib/wow/dist/wow.js',
    './components/lib/Snap.svg/dist/snap.svg.js',
    './components/customLibs/single-page-nav/jquery.singlePageNav.js'
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
    './components/lib/bootstrap/dist/css/bootstrap.css',
    './components/lib/animate.css/animate.css'
];
var libCssDest = './development/lib/css/';
//Task
gulp.task('concatCssLibs', function(){
   gulp.src(libCssSrc)
     .pipe(concat('libraries.css'))
     .pipe(gulp.dest(libCssDest));
});


//««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// DELETE task  (Clean PRODUCTION and some development contents )
//««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
gulp.task('clean', function () {
  return del ([
    './production/build/public/css/style.css',
    './production/build/public/javascript/script.js',
    './production/build/public/lib/',
    './production/build/public/images',
    './production/build/node_modules',
    './production/build/public/index.html',


    './development/css/style.css',
    './development/javascript/**',
    './development/lib/**',
    './development/maps/',
    './development/index.html',
    // 'components/lib/'
  ]);
 
});

//Clean libs
//««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
gulp.task('cleanLibs', function () {
  return del ([
    './production/build/public/lib/',
    './development/lib/**',
    './components/lib/'
  ]);
});


//Image Minfication
//««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
gulp.task('image_min', function(){
   gulp.src('./development/images/**/**/*')
     .pipe(imagemin())
     .pipe(gulp.dest('./production/build/public/images'));
});

// NodeMon Task to auto restart the server (for Development)
//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
// Nodemon
gulp.task("nodemon", function(){
  nodemon({
    script: "./bin/www",
    ext: "js, html, scss, ejs",
    ignore: ['./node_modules/**']
  })
    .on('restart', function () {
      console.log('Server Just restarted!');
    });
});

// JS HINT (for Development)
//«««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««««
gulp.task('lint', function () {
  gulp.src('./components/javascript/**/**/*.js')
    .pipe(jshint());
});


//////////////////////////////////////////////////////////
/* «««««««««««««««« PRODUCTION ««««««««««««««««««««««««*/
//////////////////////////////////////////////////////////


// Javascript Uglify Task (for production)
//«««««««««««««««««««««««««««««
// File Paths
var js2uglify = ['./development/javascript/script.js'];
var uglyJsDest = './production/build/public/javascript/';
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
    './components/lib/angular-route/angular-route.min.js',
    './components/lib/angular-animate/angular-animate.min.js',
    './components/lib/jquery_min/index.js',
    './components/lib/modernizer/modernizer.js',
    './components/lib/bootstrap/dist/js/bootstrap.min.js',
    './components/lib/typed.js/dist/typed.min.js',
    './components/lib/wow/dist/wow.min.js',
    './components/lib/Snap.svg/dist/snap.svg-min.js',
    './components/customLibs/single-page-nav/jquery.singlePageNav.min.js'
];
var libMinDest = './production/build/public/lib/js';
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
    './components/lib/bootstrap/dist/css/bootstrap.min.css',
    './components/lib/animate.css/animate.min.css'
];
var libMinCssDest = './production/build/public/lib/css/';
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
var cssDest = 'production/build/public/css/';
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

// gulp HTML task
//««««««««««««««««««««
var devSrc = './development/index.html';
var prodDest = './production/build/public/';
// Task
gulp.task('stripComm', function(){
  gulp.src(devSrc)
  .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
  .pipe(strip())
  .pipe(gulp.dest(prodDest))
  .pipe(reload({stream:true}));
});

// gulp Production HTML Minify
//«««««««««««««««««««««««««««\
var ProdHtml = './production/build/public/index.html';
var prodHtmlMin = './production/build/index.html';
 
gulp.task('minifyHtml', function() {
  gulp.src(ProdHtml)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(prodHtmlMin));
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
            baseDir: "./production/build/public"
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
  gulp.watch('./development/*.html', ['html']);
  gulp.watch('./views/**/**/*.ejs', ['ejs']);
  //gulp.watch('./gulpfile.js', ['default']);
});


// gulp Default task
//««««««««««««««««««««
gulp.task('default', ['sass', 'html', "nodemon", "lint", 'concatJs', 'concatLibs', 'concatCssLibs', 'watch', 'serverDev', 'image_min', 'ejs']);

gulp.task('production', ['uglifyJs', 'stripComm', 'concatMinLibs', 'minifyCss', 'concatMinCssLibs', 'serverProd', 'minifyHtml']);

/*  */
/*««««««««««««««««««««««««««««««««««««««««««««««««*/



















