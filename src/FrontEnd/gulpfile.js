var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('default', function () {
    return gulp.src('./src/style/style.less')
      .pipe(less())
      .pipe(gulp.dest('./src/style'));
});

