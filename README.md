# Gulp Project 
This is sample gulp work flow.

# The Pre Requirements for this project in order to use it.  

<p align="center">* [Node JS](https://nodejs.org/)</p>
<p align="center">* [NPM](https://www.npmjs.com/)</p>
<p align="center">* [GIT](https://git-scm.com/downloads)</p>

# `The List of the packages being used in this Gulp Project`

* gulp
* bower
* browser-sync
* del
* gulp-autoprefixer
* gulp-clean-css
* gulp-concat
* gulp-htmlmin
* gulp-sass
* gulp-plumber
* gulp-sourcemaps
* gulp-uglify

# Instructions to use the project
* Clone the project by using https://github.com/sandeepkumar14/gulp.git
* Once inside the cloned folder, run `sudo npm install`
* Then run `bower install`
* This project divided into development and production. For each task there are two seperate browser sync server and tasks.
* For Development run `gulp`
* For Production `gulp production`
* Whenever the `gulp` and `gulp production tasks being run the html file will be automatically will open in default browser.`
* To clean up or start clean there is a clean task using gulp delete module. Just run `gulp clean`
* We can always combine the development and production tasks together, in that case we just combine all in default task, and we will just run the `gulp` in terminal once.