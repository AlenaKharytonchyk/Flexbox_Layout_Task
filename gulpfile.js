const { src, dest, parallel, series } = require('gulp');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const inject = require('gulp-inject');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

function html() {
  const target = src('./src/index.html');
  const sources = src(['./build/js/*.js', './build/css/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(dest('./build'));
}
function css() {
  const processors = [
    autoprefixer,
    cssnano
];
  return src('src/*.less')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(minifyCSS())
    .pipe(dest('build/css'))
}

function js() {
  return src('src/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = series(parallel(css, js), html);
