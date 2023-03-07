const {parallel, watch, src, dest, series} = require('gulp'),
      browserSync = require('browser-sync').create(),
      sass = require('gulp-sass')(require('sass')),
      concat = require('gulp-concat'),
      cssMinify = require('gulp-css-minify'),
      file_include = require('gulp-file-include'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin')    

let css = () => {
    return src('./public/assets/css/**/*.sass')
    .pipe(concat('main.sass'))
    .pipe(sass())
    .pipe(cssMinify())
    .pipe(concat('main.css'))
    .pipe(dest('./dist/assets/css'))
    .pipe(browserSync.stream())
}

let js = () => {
  return src('./public/assets/js/**/*.js')
  .pipe(uglify())
  .pipe(dest('./dist/assets/js'))
  .pipe(browserSync.stream())

 
}

let html = () => {
    return src('./public/**/*.html')
    .pipe(browserSync.stream())
}

let image = () => {

  return src('./public/assets/img/**/*')
  .pipe(imagemin())
  .pipe(dest('./dist/assets/img/'))
  .pipe(browserSync.stream())

}

let include = () => {
  return src('./public/**/*.html')
  .pipe(file_include({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(dest('./dist/'))
  .pipe(browserSync.stream())
}


let serve =  series( css,js,html,include,image ,() => {

    browserSync.init({
        server : './dist/'
    })

    watch('./public/assets/css/**/*.sass', css);
    watch('./public/assets/js/**/*.js', js);
    watch('./public/**/*.html', include);
    watch('./public/assets/img/', image);
    watch("./public/**/*")
    .on('change', browserSync.reload);
})

  
exports.serve = serve;
exports.default = parallel(serve,css,js,html,include,image);