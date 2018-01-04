var gulp = require('gulp');
var browserSync = require('browser-sync')
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css')
var reload = browserSync.reload;

/*每一个css输出一个同名css*/
gulp.task('css', function() {
    return gulp.src('public/sass/*.scss')
    // 分别输出未压缩版本
        .pipe(sass()).pipe(rename({extname: '.scss.css'})).pipe(gulp.dest('dist/css'))
    // 输出压缩后的合并版本
        .pipe(sass({outputStyle: 'compressed'})).pipe(concat('scss.min.css')).pipe(gulp.dest('dist/css'));
});
var DEST = 'dist/js/';
gulp.task('js', function() {
    return gulp.src('public/scripts/*.js')
    // 这会输出一个未压缩过的版本
        .pipe(gulp.dest(DEST))
    // 这会输出一个压缩过的合并的 main.min.js 的文件
        .pipe(uglify()).pipe(concat('main.min.js')).pipe(gulp.dest('dist'));
});

/*将css文件合并，然后压缩*/
gulp.task('cssdefault', function() {
    return gulp.src(['public/css/*.css']).pipe(concat('common.css')).pipe(gulp.dest('dist/css')).pipe(cleanCSS()).pipe(concat('common.min.css')).pipe(gulp.dest('dist/css'));
});

/*合并所有min.css为一个css文件*/
gulp.task('cssMinify', function() {
    return gulp.src('dist/css/*.min.css').pipe(cleanCSS()).pipe(concat('test.min.css')).pipe(gulp.dest('dist'))
})

//只执行一次
gulp.task('default', ['css', 'cssdefault', 'js']);

//实时监控
gulp.task('watch', [
    'css', 'cssdefault', 'js', 'cssMinify'
], function() {
    gulp.watch(['public/css/*.css'], ['cssdefault'])
    gulp.watch(['public/sass/*.scss'], ['css'])
    gulp.watch(['public/scripts/*.js'], ['js'])
    gulp.watch('dist/css/*.min.css', ['cssMinify'])
});

/* 启动服务， 监视文件改动并重新载入 */
gulp.task('sass', function() {
    return gulp.src('public/sass/*.scss').pipe(sass()).pipe(concat('test.css')).pipe(gulp.dest('dist/css')).pipe(sass({outputStyle: 'compressed'})).pipe(concat('test.min.css')).pipe(gulp.dest('dist'))
    // 触发重新加载
        .pipe(reload({stream: true}));
});

gulp.task('uglify', function() {
    return gulp.src('public/scripts/*.js').pipe(gulp.dest('dist/js/')).pipe(uglify()).pipe(concat('main.min.js')).pipe(gulp.dest('dist'))
    // 触发重新加载
        .pipe(reload({stream: true}));
})

// 监视 sass、js 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
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
