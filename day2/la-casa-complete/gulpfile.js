const gulp = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
var sass = require('gulp-sass');
const reload = browserSync.reload;




gulp.task('styles', () => {
  return gulp.src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(concat('./styles.min.css'))
    .pipe(gulp.dest('./css'))
		.pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
	return gulp.src('./scripts/*.js')
		.pipe(concat('./scripts.min.js'))
		// .pipe(uglifyJS())
		.pipe(gulp.dest('./js'))
		.pipe(reload({stream: true}));
});


// Serve
gulp.task('serve', ['styles', 'scripts'], () => {
// Static server
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	gulp.watch([
		'./sass/*.scss',
		'./scripts/*.js',
		'*.html'
	]).on('change', reload);



	gulp.watch('./sass/*.scss', ['styles']);
	gulp.watch('./scripts/*.js', ['scripts']);
	gulp.watch('*.html');
});
