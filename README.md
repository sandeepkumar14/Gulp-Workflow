# Gulp-Workflow
This is a sample gulp prject.
<p align="center">Requirements for the gulp to be run on a system:</p>
<p align="center"><a href="https://nodejs.org/">Node JS</a></p>
<p align="center"><a href=https://www.npmjs.com/">npm</a></p>
<p align="center"><a href="https://www.ruby-lang.org/">Ruby</a></p>
<p align="center"><a href="compass-style.org/">Compass</a></p>

==> The modules being used for this project
Bower, browser-sync, gulp, gulp-autoprefixer, gulp-compass, gulp-concat, gulp-htmlmin, gulp-minify-css, gulp-plumber, gulp-uglify and rimraf.

==> Steps to use gulp work flow
git clone https://github.com/sandeepkumar14/Gulp-Workflow.git



```js
sudo npm install

bower install

gulp
(This will open the developement files in a browser and we will have live reload functionalities, not even in browser, also in mobile devices if it connect to same wifi connection. 
For more info please checkp https://www.browsersync.io/docs/gulp

gulp serverProd
(This will serve the production files in a browser to check the production files work fine.)

gulp rimraf
(This will clean up production files, in case a clean start.)
