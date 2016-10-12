var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    jshint          = require('gulp-jshint'),
    header          = require('gulp-header'),
    rename          = require('gulp-rename'),
    cleanCSS        = require('gulp-clean-css'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    data            = require('gulp-data'),
    concat          = require('gulp-concat'),
    del             = require('del'),
    sourcemaps      = require('gulp-sourcemaps'),
    plumber         = require('gulp-plumber'),
    prettyUrl       = require('gulp-pretty-url'),
    watch           = require('gulp-watch'),
    awspublish      = require('gulp-awspublish'),
    package         = require('./package.json');


var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

var config = {
  jsPaths: [
    'src/js/vendor/modernizr.js',
    'src/js/vendor/jquery.min.js',
    'src/js/vendor/underscore-min.js',
    'src/js/vendor/bootstrap.min.js',
    'src/js/vendor/briefcase.min.js',
    'src/js/modules/_config.js',
    'src/js/modules/_tools.js',
    'src/js/modules/challenge.js',
    'src/js/modules/submissions.js',
    'src/js/scripts.js'
  ],
  cssPaths: [
    'src/scss/style.scss'
  ],
  htmlPaths: [
    'src/pages/*.+(html|nunjucks)'
  ],
  templatePaths: [
    'src/templates'
  ],
  staticPath: './static',
  staticFiles: '/**/*.+(ico|png|svg|jpg|gif|eot|ttf|woff|woff2)'
};

// De-caching for Data files
function requireUncached( $module ) {
  delete require.cache[require.resolve( $module )];
  return require( $module );
}

gulp.task( 'static', ['clean:static'], function() {
  gulp.src( config.staticPath + config.staticFiles, { base: config.staticPath } )
    .pipe(gulp.dest('./dist'));
});

gulp.task( 'clean:static', function() {
  return del([
    './dist/images',
    './dist/fonts',
    './dist/css',
    './dist/js'
  ]);
});

gulp.task( 'css', ['clean:css'], function() {
  return gulp.src( config.cssPaths )
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 3 version'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(plumber.stop())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task( 'clean:css', function() {
  return del([
    './dist/css/style.css',
    './dist/css/style.min.css',
  ]);
});

gulp.task( 'js', ['clean:js'], function() {
  return gulp.src( config.jsPaths )
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(concat('scripts.js'))
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task( 'clean:js', function() {
  return del([
    './dist/js/scripts.js',
    './dist/js/scripts.min.js',
  ]);
});

gulp.task( 'html', function() {
  return gulp.src( config.htmlPaths )
    .pipe( data( function( file ) {
      return requireUncached('./src/templates/courses.json');
    }))
    .pipe(nunjucksRender({
      path: config.templatePaths
    }))
    .pipe(prettyUrl())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task( 'browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "dist"
    },
    browser: "google chrome"
  });
});

gulp.task('default', ['css', 'js', 'html', 'static', 'browser-sync'], function() {
  gulp.watch("src/scss/*/*.scss", ['css']);
  gulp.watch("src/js/**/*", ['js']);
  gulp.watch(["src/pages/**/*.+(html|nunjucks)", "src/templates/**/*.+(html|nunjucks|json)"], ['html']);
  gulp.watch("./static/**/*").on("change", function( file ) {
    gulp.src( file.path )
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.reload({stream:true}));
  });
});
