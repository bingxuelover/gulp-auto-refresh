var gulp = require('gulp');
var browserSync = require('browser-sync')
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var reload = browserSync.reload;

gulp.task('css', function() {
  return gulp.src('public/sass/*.scss')
  //输出未压缩版本
    .pipe(sass()).pipe(gulp.dest('dist/css'))
  // 输出压缩版本
    .pipe(sass({outputStyle: 'compressed'})).pipe(rename({extname: '.min.css'})).pipe(gulp.dest('dist/css'));
});
var DEST = 'dist/js/';
gulp.task('js', function() {
  return gulp.src('public/scripts/*.js')
  // 这会输出一个未压缩过的版本
    .pipe(gulp.dest(DEST))
  // 这会输出一个压缩过的并且重命名未 main.min.js 的文件
    .pipe(uglify()).pipe(rename({extname: '.min.js'})).pipe(gulp.dest(DEST));
});
//只执行一次
gulp.task('default', ['css', 'js']);

gulp.task('css:watch', function() {
  //通过watch监测到修改的文件执行输出
  return gulp.src('public/sass/*.scss')
  //watch监测，一直监视状态
    .pipe(watch('public/sass/*.scss'))
  //输出
    .pipe(sass()).pipe(gulp.dest('dist/css')).pipe(sass({outputStyle: 'compressed'})).pipe(rename({extname: '.min.css'})).pipe(gulp.dest('dist/css'));
});

/* 监视文件改动并重新载入 */

gulp.task('sass', function() {
  return gulp.src('public/sass/*.scss').pipe(sass()).pipe(gulp.dest('dist/css')).pipe(sass({outputStyle: 'compressed'})).pipe(rename({extname: '.min.css'})).pipe(gulp.dest('dist/css'))
  // 触发重新加载
    .pipe(reload({stream: true}));
});

gulp.task('uglify', function() {
  return gulp.src('public/scripts/*.js').pipe(gulp.dest('dist/js/')).pipe(uglify()).pipe(rename({extname: '.min.js'})).pipe(gulp.dest('dist/js/'))
  // 触发重新加载
    .pipe(reload({stream: true}));
})

// 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('serve', [
  'sass', 'uglify'
], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['*.html'], {
    cwd: 'dist'
  }, reload);
  //scss文件有变化时，执行sass
  gulp.watch('public/sass/*.scss', ['sass']);
  // js文件有变化时，执行uglify
  gulp.watch('public/scripts/*.js', ['uglify']);
});
