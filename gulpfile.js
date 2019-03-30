const {
  src, dest, parallel, series, watch
} = require('gulp');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const inject = require('gulp-inject');
const eslint = require('gulp-eslint');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const connect = require('gulp-connect');

function html() {
  const target = src('./src/index.html');
  const sources = src(['./build/js/*.js', './build/css/*.css'], {
    read: false
  });

  return target
    .pipe(
      inject(sources, {
        addRootSlash: false,
        ignorePath: '/build/'
      })
    )
    .pipe(dest('./build'))
    .pipe(connect.reload());
}
function css() {
  const processors = [autoprefixer, cssnano];
  return src('src/*.less')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(minifyCSS())
    .pipe(dest('build/css'))
    .pipe(connect.reload());
}
function webserver() {
  return connect.server({ livereload: true, root: ['build'] });
}

function js() {
  return src('src/*.js', { sourcemaps: true })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
    .pipe(connect.reload());
}
function watchTask(cb) {
  watch('src/*.less', css);
  watch('src/*.js', js);
  watch('src/index.html', html);
  cb();
}
exports.watch = series(parallel(css, js), html, parallel(webserver, watchTask));
exports.default = series(parallel(css, js), html);
